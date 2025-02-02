from typing import List, Optional, Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langchain_core.messages import AnyMessage, AIMessage, HumanMessage, SystemMessage
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI


# Define the structure for the parsed response
class UserDataResponse(BaseModel):
    """
    Response from the LLM that extracts the user data from the chat history
    """
    city: Optional[str] = Field(
        description="The city the user is planning to travel to"
    )
    check_in: Optional[str] = Field(description="The check-in date of the user's stay")
    check_out: Optional[str] = Field(
        description="The check-out date of the user's stay"
    )
    persons: Optional[int] = Field(
        description="The number of people the user is planning to travel with"
    )
    rating: Optional[int] = Field(
        description="The rating the user is looking for in their stay. Give a number between 1 and 5."
    )
    facilities: Optional[List[str]] = Field(
        description="The facilities the user is looking for in their stay"
    )
    price: Optional[int] = Field(
        description="The maximum price the user is looking for in their stay. Strictly keep it in integer if present else keep null"
    )

class UserDataState(BaseModel):
    chat_history: List[AnyMessage] = []
    # intermediate_steps: List[tuple[AgentAction, str]] = []
    response: Optional[UserDataResponse] = None
    session_id: int
    tries: int = 0
    missing_data: Optional[str] = None


cities = ["Dubai","Las Vegas","Makkah","Singapore","Paris","Bangkok","London","Phuket","Bali","Orlando","Clarence, New York","Abu Dhabi","Madinah","Riyadh","Rome","Chicago","Krabi","Mumbai/Bombay","Kuala Lumpur","New Delhi","Bangalore"]
facilities = ["wifi", "parking", "pool", "fitness", "spa"]


def process_user_input_node(state: UserDataState):
    messages = [
        SystemMessage(
            content=f"""You are a helpful assistant that extracts travel plan details from a conversation.
    Given the chat history: {state.chat_history}, please extract and return the details as a valid JSON object.
    Include only the following keys: city, check_in, check_out, persons, rating, facilities, and price.
    Make sure to return the rating as an integer.     
    # Valid cities include: {", ".join(cities)}
    # Valid facilities include: {", ".join(facilities)}
    If you are unable to extract the data, return an empty JSON object."""
        )
    ]

    for message in state.chat_history:
        messages.append(message)

    model = ChatOpenAI(model="gpt-3.5-turbo",temperature=0)
    structured_llm = model.with_structured_output(UserDataResponse, method="json_mode")
    
    llm_response = structured_llm.invoke(messages)
    print("LLM generated response:", llm_response)
    
    flattened_llm_response = " ".join(str(llm_response).split())
    missing_data_prompt = f"""You are a chatbot that assists users in providing travel details. 
    Based on the extracted data, generate a short response asking for the missing details from the extracted data.
    (check-in date, check-out date, city, and number of persons) in a friendly way.
    Given the extracted data: {flattened_llm_response}"""
    
    missing_data_response = model.invoke(missing_data_prompt)
    print("LLM missing data response:", missing_data_response.content)

    return {"response": llm_response, "missing_data": missing_data_response.content}


# Create the state graph with the defined state
graph = StateGraph(UserDataState)


userInputNode = "user_input"

graph.add_edge(START, userInputNode)
graph.add_node(userInputNode, process_user_input_node)
graph.add_edge(userInputNode, END)

# Compile the workflow for execution
workflow = graph.compile()

png = workflow.get_graph().draw_mermaid_png()
with open("graph.png", "wb") as f:
    f.write(png)
