// Function that helps to group remarks by their location
// Group's interface
// {
//   count: 3,
//   lat: 1,
//   lng: 103,
//   remarks: [remarkObj, remarkObj, remarkObj]
// }
//

const RemarksGroupByLocaction = (remarks) => {
  let groupedRemarks = [];

  for (let remark of remarks) {

    let group = groupedRemarks.find((r) => {
      return r.lng === proximity(remark.lng)
          && r.lat === proximity(remark.lat)
    });

    if (group) {
      group.count++;
      group.remarks.push(remark);
    } else {
      groupedRemarks.push({
        count: 1,
        lng: proximity(remark.lng),
        lat: proximity(remark.lat),
        remarks: [remark]
      });
    }
  }

  return groupedRemarks;
};

const proximity = (coord, precision = 4) => {
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


  return coord.toFixed(precision);

};


export default RemarksGroupByLocaction;
