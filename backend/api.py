from flask import Flask, send_file, jsonify, url_for, make_response
from flask_restful import Resource, Api
import os
import torch
# import torchvision
# import pandas as pd
import torch.nn as nn
import torch.nn.functional as F
from PIL import Image, ImageDraw, ImageFilter
from PIL import Image, ImageEnhance, ImageFont
import matplotlib.pyplot as plt
import io, base64
import time
from ISR.models import RDN, RRDN
from skimage.transform import rescale, resize, downscale_local_mean


app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

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

def denorm(img_tensors):
    stats = (0.5, 0.5, 0.5), (0.5, 0.5, 0.5)
    return img_tensors * stats[1][0] + stats[0][0]

incr = 0

@app.route('/generator/<uuid>', methods=['GET'])
def generator(uuid):
    if os.path.isfile('static/'+ uuid + '.jpg') == True :
        return send_file('static/' + uuid + '.jpg', mimetype='image/jpg')
    latent_size = 150
    generator = Generator(latent_size)
    device = torch.device('cpu')
    generator.load_state_dict(torch.load('./gen_150_final.pt', map_location=device))

    image_size = (64,64)
    stats = (0.5, 0.5, 0.5), (0.5, 0.5, 0.5)

    # def denorm(img_tensors):
    #     return img_tensors * stats[1][0] + stats[0][0]

    generator = generator.to(device)

    xb = torch.randn(1, latent_size, 1, 1) # random latent tensors
    fake_images = generator(xb.to('cpu'))
    fake_images = denorm(fake_images.view(3, 64, 64))

    fake_images = fake_images.permute(1,2,0).cpu().detach().numpy()
    fake_images = fake_images*255
    # plt.imsave('static/fakeIm.jpg', fake_images.astype('uint8'), vmin=0, vmax=255)

    # return 'hello'

    rdn = RDN(weights='psnr-small')
    beg = time.time()
    sr_img = rdn.predict(fake_images) #to 124
    sr_img = rdn.predict(sr_img) #to 500?
    sr_img = rdn.predict(sr_img) #to 1024 i think huge image
    print(time.time() - beg)
    image_rescale = rescale(sr_img, 0.5, multichannel=True, anti_aliasing=True)

    plt.imsave('static/'+uuid+'.jpg', image_rescale.astype('uint8'), vmin=0, vmax=255)
    return send_file('static/'+uuid+'.jpg', mimetype='image/jpg')

@app.route('/addwords/<uuid>')
def addwords(uuid):

    im = Image.open('static/'+uuid+'.jpg')

    retur 

# @app.route('/sweater/<uuid>', methods = ['GET'])
# def sweater(uuid):


if __name__ == '__main__':
    app.run(debug=True)