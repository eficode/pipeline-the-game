module.exports = function customMappingFunction(explicit, implicit, path, reflection, context) {

  try {
    if (explicit) {
      return explicit;
    }
    if (implicit === 'src\\_shared') {
      return '@shared';
    }
    if (implicit === 'src') {
      return 'root';
    }
    if (implicit.startsWith('src\\_shared\\')) {
      // if its in shared return @shared/{folderName}
      return `@shared/${implicit.replace('src\\_shared\\', '').split('\\')[0]}`;
    } else {
      return implicit.replace('src\\', '').split('\\')[0];
    }
  }catch (e){
    console.error(e);
    return implicit;
  }
};
