import qrcode

url = "https://pizzamore-qr-site.vercel.app/"

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save("final-qr.png")

print("QR Code generated successfully as final-qr.png")
