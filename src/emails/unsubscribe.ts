export const unsubscribeTemplate = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
        }
        .header { font-size: 24px; margin-bottom: 20px; }
        .content { margin-bottom: 24px; }
        .footer {
            font-size: 14px;
            color: #666;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Unsubscribe Confirmation</div>
        <div class="content">
            <p>Hi,</p>
            <p>You have been successfully unsubscribed from our newsletter.</p>
            <p>We're sorry to see you go. If you'd like to share any feedback about why you're unsubscribing, feel free to reply to this email.</p>
            <p>You can always resubscribe at <a href="https://ohao.tech">ohao.tech</a> if you change your mind.</p>
        </div>
        <div class="footer">
            <p>Best regards,<br>Shaoxuan</p>
        </div>
    </div>
</body>
</html>
`;
