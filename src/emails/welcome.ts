export const welcomeEmailTemplate = `
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
        <div class="header">🎉 Welcome to My Newsletter!</div>
        <div class="content">
            <p>Hi! 👋</p>
            <p>Thanks for joining my newsletter! I'm excited to share insights about graphics programming, computer science, and technology with you.</p>
            <p>What you'll receive: ✨</p>
            <ul>
                <li>🖥️ Deep dives into graphics programming and ray tracing</li>
                <li>🚀 Updates on my latest projects</li>
                <li>💡 Tech insights and tutorials</li>
                <li>🎯 Early access to new projects</li>
            </ul>
            <p>Expect to hear from me about once a month with quality content!</p>
        </div>
        <div class="footer">
            <p>Best regards,<br>Shaoxuan</p>
            <p>Connect with me:<br>
            GitHub: <a href="https://github.com/Qervas">@Qervas</a><br>
            Twitter: <a href="https://twitter.com/FrankYin17">@FrankYin17</a></p>
            <p style="font-size: 12px; color: #888;">
                You're receiving this because you subscribed at ohao.tech.<br>
                To unsubscribe, please reply to this email.
            </p>
        </div>
    </div>
</body>
</html>
`;
