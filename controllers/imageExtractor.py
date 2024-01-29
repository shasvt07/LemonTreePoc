import cv2
import numpy as np
import base64
import sys

print(sys.argv[1]);

def extract_face_from_base64(input_base64):
    # Decode the base64 input image
    input_bytes = base64.b64decode(input_base64)
    nparr = np.frombuffer(input_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    face_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    )

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(
        gray, scaleFactor=1.7, minNeighbors=10, minSize=(60, 60)
    )

    if len(faces) == 0:
        print("No faces found")
        return None

    x, y, w, h = faces[0]

    border = 20  # adjust the border size as needed
    x -= border
    y -= border
    w += 2 * border
    h += 2 * border

    x = max(x, 0)
    y = max(y, 0)
    w = min(w, image.shape[1] - x)
    h = min(h, image.shape[0] - y)

    face_with_border = image[y : y + h, x : x + w]

    # Encode the resulting image to base64 format
    _, buffer = cv2.imencode('.jpg', face_with_border)
    output_base64 = base64.b64encode(buffer).decode('utf-8')

    print("Face with border extracted successfully")

    return output_base64

# Example usage:
input_base64 = sys.argv[1]
output_base64 = extract_face_from_base64(input_base64)
print(output_base64)
