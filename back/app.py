from help.test import load_csv,save_csv, CSV_FILE
from flask import Flask,request ,jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)


df = pd.read_csv(CSV_FILE)


@app.route("/", methods=['GET'])
def start_site():
    diamonds = load_csv()
    save_csv(diamonds)
    return diamonds

@app.route("/max", methods=['GET'])
def max_price():
    ls = []
    max_price = df['price'].max()
    ls.append(int(max_price))
    return ls

@app.route("/mean", methods=['GET'])
def mean_price():
    ls = []
    mean_price = df['price'].mean()
    ls.append(int(mean_price))
    return ls

@app.route("/ideal", methods=['GET'])
def count_ideal():
    ls = []
    ideal_count = df[df['cut']=='Ideal'].shape[0]
    ls.append(int(ideal_count))
    return ls

@app.route("/premium", methods=['GET'])
def count_premium():
    ls = []
    premium_carats = df[df['cut'] == 'Premium']['carat']
    median_carat = premium_carats.median()
    ls.append(str(median_carat))
    return ls

@app.route("/avgcut", methods=['GET'])
def avg_carat():
    ls = []
    cut_carat_avg = df.groupby('cut')['carat'].mean()
    # method to convert the DataFrame "cut_carat_avg" to a JSON string
    ls.append(str(cut_carat_avg))
    return ls

@app.route("/colorpa", methods=['GET'])
def color_price_avg():
    ls = []
    color_price_avg = df.groupby('color')['price'].mean()
    ls.append(str(color_price_avg))
    # method to convert the DataFrame "color_price_avg" to a JSON string
    return ls


# @app.route("/add", methods=['POST'])
# def add_diamond():
#     data = request.get_json()
#     diamonds.append(data)
#     save_csv(diamonds)
#     return data


@app.route("/add", methods=['POST'])
def add_diamond():
    data = request.get_json()
    global df
    last_row = df.tail(1)
    last_id = int(last_row.ID)
    new_id = last_id + 1
    data["ID"] = new_id
    # ignore_index - a parameter in Pandas DataFrame.append method that ignore the original indices 
    # and reset the indices of the resulting DataFrame to be a range from 0 to n-1(n = count rows)
    df = df.append(data, ignore_index=True)
    # drops the rows with missing values (NaN) in the df and the changes are made in place (inplace=True)
    df.dropna(inplace=True)
    df.to_csv(CSV_FILE, index=False)
    return data



@app.route("/upd_diamond", methods=['PUT'])
def update_diamond():
    diamonds = load_csv()
    data = request.get_json()
    found = False
    for i,d in enumerate(diamonds):
        if d["ID"] == data["ID"]:
            diamonds[i]["price"] = data["price"]
            found = True
            break
    if found is False:
        return { "error": "diamond not found" }
    save_csv(diamonds)
    return diamonds


@app.route("/del_diamond/<int:id>", methods=['DELETE'])
def delete_diamond(id):
    global df 
    df = df[df.ID != id]
    df.to_csv(CSV_FILE, index=False)
    return jsonify({"message": "Diamond with id {} deleted.".format(id)})



@app.route("/clean")
def killthemall():
    save_csv([])
    return load_csv()


if __name__ == '__main__':
    app.run(debug=True)