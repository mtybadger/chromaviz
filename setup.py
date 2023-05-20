#!/usr/bin/env/python

import setuptools

if __name__ == "__main__":
    setuptools.setup(
        name="chromaviz",
        version="0.0.4",
        url="https://github.com/mtybadger/chromaviz",
        author="Spruce Campbell",
        author_email="spruce@mit.edu",
        description="A package for visualising Chroma vector embeddings in a web browser",
        long_description=open('README.md').read(),
        packages=setuptools.find_packages(),
        install_requires=["chromadb", "flask", "flask-cors", "numpy", "pandas", "scikit-learn"],
        include_package_data=True,
        classifiers=[
            'Programming Language :: Python',
            'Programming Language :: Python :: 3',
            'Programming Language :: Python :: 3.7',
        ],
    )