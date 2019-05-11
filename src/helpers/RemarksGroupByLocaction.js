// Function that helps to group remarks by their location
// Group's interface
// {
//   count: 3,
//   lat: 1,
//   lng: 103,
//   remarks: [remarkObj, remarkObj, remarkObj]
// }
//

const RemarksGroupByLocaction = (remarks, zoomLevel = 13) => {
  let groupedRemarks = [];

  for (let remark of remarks) {

    let group = groupedRemarks.find((r) => {
      return r.lng === proximity(remark.lng, zoomLevel)
          && r.lat === proximity(remark.lat, zoomLevel)
    });

    if (group) {
      group.count++;
      group.remarks.push(remark);
    } else {
      groupedRemarks.push({
        count: 1,
        lng: proximity(remark.lng, zoomLevel),
        lat: proximity(remark.lat, zoomLevel),
        remarks: [remark]
      });
    }
  }

  return groupedRemarks;
};

const proximity = (coord, zoomLevel) => {
  // decimal
  // places   degrees          distance
  // -------  -------          --------
  // 0        1                111  km
  // 1        0.1              11.1 km
  // 2        0.01             1.11 km
  // 3        0.001            111  m
  // 4        0.0001           11.1 m
  // 5        0.00001          1.11 m
  // 6        0.000001         11.1 cm
  // 7        0.0000001        1.11 cm
  // 8        0.00000001       1.11 mm
let precision = 0;

if (zoomLevel < 10 && zoomLevel >= 1) {
  precision = 1;

  return coord.toFixed(precision);
}

switch (zoomLevel) {
  case 10:
  case 11:
    precision = 2;
    break;

  case 12:
    precision = 3;
    break;

  case 13:
  case 14:
  case 15:
    precision = 4;
    break;

  case 16:
    precision = 5;
    break;

  case 17:
    precision = 6;
    break;

  default:
    precision = 7;
}
  return coord.toFixed(precision);

};


export default RemarksGroupByLocaction;
