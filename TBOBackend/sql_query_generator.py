from get_user_data_agent import UserDataState
from db import client


def get_results(state: UserDataState):
    print(f"State: {state.response}")
    query = sql_generate(state)
    print(f"Query: {query}")
    query_result = client.query(query)
    formatted_results = [dict(zip(query_result.column_names, row)) for row in query_result.result_rows]
    print("Query Results:", formatted_results)
    return formatted_results


def sql_generate(state: UserDataState) -> str:
    """
    Generates an SQL query based on filters provided in state.response.
    The UserDataResponse provides the following filters:
      - city: filter by the hotel city.
      - check_in: the desired check-in date.
      - check_out: the desired check-out date.
      - persons: required minimum capacity.
      - rating: minimum hotel rating.
      - price: maximum hotel price.
      - facilities: list of required facilities.
    
    This example assumes a "hotels" table with columns:
      city, check_in, check_out, capacity, rating, price, facilities
    Adjust as needed.
    """
    if state.response is None:
        raise ValueError("No response provided for SQL generation.")

    r = state.response  # Alias for brevity
    sql = "SELECT HotelCode FROM prod.hotel_data"
    conditions = []

    if r.city:
        conditions.append(f"CityName = '{r.city.lower()}'")
    if r.check_in:
        conditions.append(f"check_in = '{r.check_in}'")
    if r.check_out:
        conditions.append(f"check_out = '{r.check_out}'")
    if r.persons:
        conditions.append(f"capacity >= {r.persons}")
    if r.rating:
        conditions.append(f"HotelRating >= {r.rating}")
    if r.price:
        conditions.append(f"price <= {r.price}")
    if r.facilities:
        for facility in r.facilities:
            conditions.append(f"facilities LIKE '%{facility}%'")

    if len(conditions) > 0:
        sql += " WHERE " + " AND ".join(conditions)

    return sql