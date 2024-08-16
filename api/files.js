const axios = require('axios');

const TELEGRAM_API_URL = 'https://api.telegram.org/bot<YOUR_BOT_TOKEN>';

async function fetchChannelFiles() {
  try {
    const response = await axios.get(`${TELEGRAM_API_URL}/getUpdates`);
    const files = response.data.result
      .filter(update => update.channel_post && update.channel_post.document)
      .map(update => update.channel_post.document);
    return files;
  } catch (error) {
    throw new Error('Error fetching files from the channel');
  }
}

module.exports = async (req, res) => {
  try {
    const files = await fetchChannelFiles();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
