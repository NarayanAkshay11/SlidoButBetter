from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)

# Database connection parameters
db_config = {
    'host': 'your_vm_ip_or_hostname',
    'user': 'your_mysql_username',
    'password': 'your_mysql_password',
    'database': 'your_database_name',
    'port': '3306'  # default MySQL port
}

# Connect to MySQL database
connection = mysql.connector.connect(**db_config)
cursor = connection.cursor()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_prompt', methods=['POST'])
def add_prompt():
    prompt_text = request.form['prompt']
    # Insert prompt into database
    cursor.execute("INSERT INTO prompts (text) VALUES (%s)", (prompt_text,))
    connection.commit()
    return 'Success'

@app.route('/get_prompts')
def get_prompts():
    cursor.execute("SELECT * FROM prompts")
    prompts = cursor.fetchall()
    return jsonify(prompts)

if __name__ == '__main__':
    app.run(debug=True)
