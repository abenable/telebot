import axios from 'axios';

export async function sendwhatsappmsg(msg) {
  const options = {
    method: 'post',
    url: 'https://graph.facebook.com/v17.0/128077970274249/messages',
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: '256706401095',
      type: 'text',
      text: {
        preview_url: false,
        body: msg,
      },
    },
  };
  try {
    await axios(options);
  } catch (error) {
    console.log(error);
  }
}
