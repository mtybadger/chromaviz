# ChromaViz

A package for visualising vector embedding collections as part of the [Chroma](https://trychroma.com) vector database. 

Uses [Flask](https://flask.palletsprojects.com/en/2.3.x/), [Vite](https://vitejs.dev), and [react-three-fiber](https://github.com/pmndrs/react-three-fiber) to host a live 3D view of the data in a web browser, should perform well up to 10k+ documents. Dimensional reduction is performed using PCA for colors down to 50 dimensions, followed by tSNE down to 3.

## How to Use
`pip install chromaviz` or `pip install git+https://github.com/mtybadger/chromaviz/`.
After installing from pip, simply call `visualize_collection` with a valid ChromaDB collection, and chromaviz will do the rest.
```
from chromaviz import visualize_collection
visualize_collection(chromadb.Collection)
```
It also works with Langchain+Chroma, as in:
```
from langchain.vectorstores import Chroma
vectordb = Chroma.from_documents(data, embeddings, ids)

from chromaviz import visualize_collection
visualize_collection(vectordb._collection)
```
## Screenshots
![Screenshot of ChromaViz on a biological dataset](/images/1.png)
![Screenshot of ChromaViz close up](/images/2.png)

## To-Do
- [ ] More dimensional reduction options and flexibility
- [ ] Refactor extremely shoddy React code
- [ ] Improve UX
