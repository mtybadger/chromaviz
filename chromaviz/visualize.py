import chromadb
from flask import Flask
from flask_cors import CORS
import time
import json
import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
import webbrowser

import importlib.resources

app = Flask(__name__)
CORS(app)

from flask import cli
from flask import Response
from flask import request
cli.show_server_banner = lambda *_: None

data = [[]]

@app.route("/")
def hello_world():
    with importlib.resources.open_text("chromaviz", "index.html") as file:
            contents = file.read()
            return contents

@app.route('/assets/<path:filename>')
def serve_assets(filename):

    mime = 'text/html'

    if(".js" in filename):
         mime = 'text/javascript'
    if('.css' in filename):
        mime = 'text/css'
    # Logic to serve the assets
    # Here, you can use the `filename` parameter to determine which asset to serve
    # You can use the `url_for` function to generate the URL for the asset dynamically
    with importlib.resources.open_text("chromaviz", filename) as file:
            contents = file.read()
            return Response(contents, mimetype=mime)

@app.route("/import-data", methods=["POST"])
def import_data_api():
     global data
     data = json.loads(request.data)
     return '', 204

@app.route("/data", methods=["GET"])
def data_api():
    df = pd.DataFrame.from_dict(data=data["embeddings"])
    print(df)
    print('Size of the dataframe: {}'.format(df.shape))

    pca_50 = PCA(n_components=50)
    pca_result_50 = pca_50.fit_transform(df)

    print('Cumulative explained variation for 50 principal components: {}'.format(np.sum(pca_50.explained_variance_ratio_)))

    time_start = time.time()

    tsne = TSNE(n_components=3, verbose=0, perplexity=40, n_iter=300)
    tsne_pca_results = tsne.fit_transform(pca_result_50)

    print('t-SNE done! Time elapsed: {} seconds'.format(time.time()-time_start))
    tsne_pca_results = tsne_pca_results / 3

    pca_3 = PCA(n_components=3)
    pca_result_3 = pca_3.fit_transform(df)
    pca_result_3 *= 10

    groups = np.argmax(pca_result_50, axis=1)

    points = []
    for position, document, metadata, id, group in zip(tsne_pca_results.tolist(), data["documents"], data["metadatas"], data["ids"], groups.tolist()):
        point = {
        'position': position,
        'document': document,
        'metadata': metadata,
        'id': id,
        'group': group
        }
        points.append(point)
    return json.dumps({'points': points})

def visualize_collection(col: chromadb.api.models.Collection.Collection, port: int = 5000, host: str = "127.0.0.1", open_browser: bool = True):
    global data
    data = col.get(include=["documents", "metadatas", "embeddings"])

    if open_browser:
        webbrowser.open(f"http://127.0.0.1:{str(port)}")

    app.run(host=host, port=port, debug=False)
    return
