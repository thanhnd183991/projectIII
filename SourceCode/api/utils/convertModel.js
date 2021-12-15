const convertId = (object) => {
  if (object.transform) {
    return object.transform();
  } else {
    const { _id, ...info } = object;
    return { id: _id, ...info };
  }
};

const convertIdArray = (obj) => {
  let rs = [];
  if (obj instanceof Array) {
    obj.forEach((el) => {
      rs.push(convertId(el));
    });
    return rs;
  } else return null;
};

module.exports = { convertId, convertIdArray };
