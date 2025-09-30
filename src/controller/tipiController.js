const Tipi = require ("../models/Tipificacion")


const getTipificacionById = async (req, res) => {
  try {
    const { tipi } = req.params;
    const tipificacion = await Tipi.findById(tipi);
    if (!tipificacion)
      return res.status(404).json({ message: "Tipificación no encontrada" });
    res.json(tipificacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getTipificacionById}