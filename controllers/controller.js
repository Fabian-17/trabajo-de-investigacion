const ctrl = {};

ctrl.renderindex = (req, res) => {
    res.render('index')
}

ctrl.rendercargar = (req, res) => {
    res.render('cargar');
}

module.exports = ctrl