export const createNewsletterTemplate = (subject: string, content: string) => `
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
        .content {
            margin-bottom: 24px;
            line-height: 1.8;
        }
        .content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 20px 0;
        }
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
        <div class="header">${subject}</div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>Best regards,<br>Shaoxuan</p>
            <p>Connect with me:<br>
            GitHub: <a href="https://github.com/Qervas">@Qervas</a><br>
            Twitter: <a href="https://twitter.com/FrankYin17">@FrankYin17</a></p>
            <p style="font-size: 12px; color: #888;">
                You're receiving this because you subscribed at ohao.tech.<br>
                To unsubscribe, <a href="https://ohao.tech/unsubscribe?email={{email}}&token={{token}}">click here</a>
            </p>
        </div>
    </div>
</body>
</html>
`;
