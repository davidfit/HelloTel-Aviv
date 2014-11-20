
function All() {
    this.imageData={};
    this.startCapture = function ()
    {
        navigator.camera.getPicture(all.onSuccess, all.onFail, { quality: 50,
                                                                encodingType: Camera.EncodingType.JPEG,
  targetWidth: window.innerWidth,
  targetHeight: window.innerWidth,
            destinationType: Camera.DestinationType.DATA_URL
                                                               });
    }
    

    this.onSuccess = function(imageData) {
        all.imageData=imageData;
        all.mergedTwoPicture();
    }

    this.onFail = function(message) {
        alert('Failed because: ' + message);
    }
    this.sendEmail = function ()
    {
        var canvas =  document.getElementById('canvas1');

        cordova.plugins.email.open({
        subject: 'מתנה',
        attachments: canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,","base64:icon.jpg//")
        });
    }
    this.mergedTwoPicture = function ()
    {
        x = window.innerWidth;
        y = window.innerWidth;

        var canvas =  document.getElementById('canvas1');
        if (! canvas || ! canvas.getContext) { return false; }
        canvas.width = x;
        canvas.height = y;
        var ctx = canvas.getContext('2d');
        var img1 = new Image();
        var img2 = new Image();
        img1.src = "data:image/jpeg;base64," +all.imageData;

        img1.onload = function() {
            ctx.drawImage(img1, 0, 0, x, y);
            img2.src = "img/frame.png";
        }
        img2.onload = function() {
            ctx.drawImage(img2,  0, 0, x, y);
            var emailBtn =  document.getElementById('sendEmailBtn');
            emailBtn.className ="show button_app";
        }
    }
}
function startCapture()
{
    all.startCapture();
}
function sendEmail()
{
    all.sendEmail();
}
var all = new All();
