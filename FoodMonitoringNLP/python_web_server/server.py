from flask import Flask
app = Flask(__name__)

@app.route("/<string:name>/", methods = ['GET', 'POST'])
def hello(name):
    print("My name", name)
    # data = request.form
    # print("See the data", data)
    return "Hello World!", name

if __name__ == "__main__":
    app.run()
