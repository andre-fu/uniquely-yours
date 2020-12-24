from flask import Flask
from flask_restful import Resource, Api
import os
import torch
import torchvision
import pandas as pd
import torch.nn as nn
import torch.nn.functional as F
# from tqdm.notebook import tqdm
import torchvision.models as models
from torch.utils.data import Dataset
from torch.utils.data import DataLoader
from torch.utils.data import random_split
from torchvision.utils import make_grid
import torchvision.transforms as transforms
from torchvision.datasets.folder import default_loader
# import matplotlib.pyplot as plt
import io, base64


app = Flask(__name__)
# api = Api(app)

# class Quotes(Resource):
#     def get(self):
#         return {
#             'William Shakespeare': {
#                 'quote': ['Love all,trust a few,do wrong to none',
#                 'Some are born great, some achieve greatness, and some greatness thrust upon them.']
#         },
#         'Linus': {
#             'quote': ['Talk is cheap. Show me the code.']
#             }
#         }

# api.add_resource(Quotes, '/')

latent_size = 150
class Generator(nn.Module):
    def __init__(self, latent_size):
        super(Generator, self).__init__()

        self.generator = nn.Sequential(
            # in: latent_size x 1 x 1

            nn.ConvTranspose2d(latent_size, 512, kernel_size=4, stride=1, padding=0, bias=False),
            nn.BatchNorm2d(512),
            nn.ReLU(True),
            # out: 512 x 4 x 4

            nn.ConvTranspose2d(512, 256, kernel_size=4, stride=2, padding=1, bias=False),
            nn.BatchNorm2d(256),
            nn.ReLU(True),
            # out: 256 x 8 x 8

            nn.ConvTranspose2d(256, 128, kernel_size=4, stride=2, padding=1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(True),
            # out: 128 x 16 x 16

            nn.ConvTranspose2d(128, 64, kernel_size=4, stride=2, padding=1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(True),
            # out: 64 x 32 x 32

            nn.ConvTranspose2d(64, 3, kernel_size=4, stride=2, padding=1, bias=False),
            nn.Tanh()
            # out: 3 x 64 x 64
        )
    
    def forward(self, x):
        return self.generator(x)


@app.route('/generator', methods=['GET'])
def generator():
    generator = Generator(latent_size)
    device = torch.device('cpu')
    generator.load_state_dict(torch.load('./drive/MyDrive/data/gen_150_final.pt', map_location=device))
    # generator.eval()
    image_size = (64,64)
    stats = (0.5, 0.5, 0.5), (0.5, 0.5, 0.5)
    def denorm(img_tensors):
        return img_tensors * stats[1][0] + stats[0][0]
    generator = generator.to(device)

    xb = torch.randn(1, latent_size, 1, 1) # random latent tensors
    fake_images = generator(xb.to('cpu'))
    fake_images = denorm(fake_images.view(3, 64, 64))



if __name__ == '__main__':
    app.run(debug=True)