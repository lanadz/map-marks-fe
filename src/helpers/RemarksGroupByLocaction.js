// Function that helps to group remarks by their location
// Group's interface
// {
//   count: 3,
//   lat: 1,
//   lng: 103,
//   remarks: [remarkObj, remarkObj, remarkObj]
// }
//

function RemarksGroupByLocaction(remarks) {
  let groupedRemarks = [];

  for (let remark of remarks) {
    let group = groupedRemarks.find((r) => r.lng === remark.lng && r.lat === remark.lat);
    if (group) {
      group.count++;
      group.remarks.push(remark);
    } else {
      groupedRemarks.push({ count: 1, lng: remark.lng, lat: remark.lat, remarks: [remark] });
    }
  }

  return groupedRemarks;
}

export default RemarksGroupByLocaction;
