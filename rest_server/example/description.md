# MINIST Example of OpenPAI Marketplace

An example of MINIST model.

## Environments

- Python 3.6
- Tensorflow 1.12
- Recommended docker image: openpai/tensorflow-py36-cu90

## Steps

- Download MINIST dataset:

```python
python download.py
```

- Classified with softmax regression:

```python
python softmax_regression.py
```

- Classified with convolution network:

```python
python convolutional.py
```

## Reference

- MNIST dataset: [link](http://yann.lecun.com/exdb/mnist/)
