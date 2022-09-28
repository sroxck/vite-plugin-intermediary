"use strict";
exports.__esModule = true;
exports.exportNamedRegExp = exports.exportDefaultRegExp = exports.getFilePathRegExp = exports.getFileName = void 0;
function getFileName(filePath) {
    return filePath.replace(/(.*\/)*([^.]+).*/ig, "$2");
}
exports.getFileName = getFileName;
var getFilePathRegExp = function (dir) {
    return new RegExp(dir);
};
exports.getFilePathRegExp = getFilePathRegExp;
var exportDefaultRegExp = /export *default/g;
exports.exportDefaultRegExp = exportDefaultRegExp;
var exportNamedRegExp = /export */g;
exports.exportNamedRegExp = exportNamedRegExp;
