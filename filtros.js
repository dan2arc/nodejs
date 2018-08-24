module.exports.filtroPorId = _filtroPorId;

function _filtroPorId(indiceRecebido){
    return (_,indice) => indice === indiceRecebido;
}