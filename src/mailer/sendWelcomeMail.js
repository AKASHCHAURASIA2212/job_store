function welcomeTemplate(username){
    let template = `<html>
      <head>
        <title>job store</title>
      </head>
      <body>
       <p>Welcome To Job Store <b>${username} </b></p>

        <p>Welcome to our company! We're so excited to have you as part of our team.</p>
        <p> We're glad you've chosen us, and we want to show our appreciation by giving you a special incentive.</p>
        <p> We're delighted to have you as our customer.</p>

        <p>Thank you for joining us!</p>
      </body>
    </html>`;

    return template
}


export default welcomeTemplate;