import clickhouse_connect
from dotenv import load_dotenv
import os

load_dotenv()

client = clickhouse_connect.get_client(
    host=os.getenv('DB_HOST'),
    port=os.getenv('DB_PORT'),
    username=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD')
)