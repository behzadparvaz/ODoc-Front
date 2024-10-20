export default function handler(req, res) {
  const isHealthy = true;
  if (isHealthy) {
    res.status(200).json({
      status: 'ok',
    });
  } else {
    res.status(500).json({
      status: 'error',
    });
  }
}
