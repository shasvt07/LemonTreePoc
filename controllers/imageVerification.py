import imageio
from skimage import color, img_as_ubyte
from skimage.metrics import structural_similarity as ssim
from skimage.transform import resize
from io import BytesIO
import requests
import sys

def read_image(url):
    response = requests.get(url)
    img = imageio.imread(BytesIO(response.content))
    return img

def resize_image(image, target_size=(256, 256)):
    return resize(image, target_size, anti_aliasing=True)

def image_similarity(image1_url, image2_url):
    # Load and resize the images from URLs
    image1 = resize_image(read_image(image1_url))
    image2 = resize_image(read_image(image2_url))

    # Convert images to grayscale
    image1_gray = color.rgb2gray(image1)
    image2_gray = color.rgb2gray(image2)

    # Convert images to uint8 for compatibility with ssim
    image1_gray = img_as_ubyte(image1_gray)
    image2_gray = img_as_ubyte(image2_gray)

    # Compute the Structural Similarity Index (SSI)
    similarity_index, _ = ssim(image1_gray, image2_gray, full=True)

    return similarity_index

# Example usage with online image URLs
image1_url = 'assets/originalAdhaar.jpeg'
image2_url = sys.argv[1]

similarity = image_similarity(image1_url, image2_url)
print(f"Similarity Index: {similarity}")