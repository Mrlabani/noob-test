const axios = require('axios');
const path = require('path');

const TELEGRAM_API_URL = 'https://api.telegram.org/bot<YOUR_BOT_TOKEN>';

module.exports = async (req, res) => {
  const { fileId } = req.query;
  if (!fileId) {
    return res.status(400).json({ error: 'File ID is required' });
  }

  try {
    const fileResponse = await axios.get(`${TELEGRAM_API_URL}/getFile?file_id=${fileId}`);
    const filePath = fileResponse.data.result.file_path;
    const downloadResponse = await axios.get(`https://api.telegram.org/file/bot<YOUR_BOT_TOKEN>/${filePath}`, { responseType: 'stream' });

    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);
    downloadResponse.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Error downloading the file' });
  }
};
