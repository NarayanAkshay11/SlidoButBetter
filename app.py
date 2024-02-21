from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)

# Database connection parameters
db_config = {
    'host': '34.126.101.73',
    'user': 'host',
    'database': 'Techterview101',
    'port': '3306'
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
