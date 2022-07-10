import logging
import os
from flask import Flask, render_template, request, jsonify
import glob

# create flask instance
app = Flask(__name__)

INDEX = os.path.join(os.path.dirname(__file__), 'index.csv')


# main route
@app.route('/')
def index():
    return render_template('index.html')

# search route
@app.route('/search', methods=['POST'])
def search():
    if request.method == "POST":

        try:
            RES = []
            RESULTS_ARRAY = glob.glob("./static/res_*.png")
            for temp in RESULTS_ARRAY:
                RES.append(temp.split("/")[-1])
            # get url
            image_url = request.form.get('img')
            name = image_url.split("/")[-1]
            temp = "res_" + image_url.split("/")[-1]
            if temp in RES:
                res = {"image":"./static/{}".format("res_"+name), "semantic":"./static/{}".format("sem_"+name)}
                return jsonify(results=([res]))
            else:
                return 'no result'
        except:
            # return error
            # jsonify({"sorry": "Sorry, no results! Please try again."}), 500
            return 'error'

if __name__ == '__main__':
    app.run()
