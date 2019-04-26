import RemarksGroupByLocaction from './RemarksGroupByLocaction';

it('groups remarks based on location', () => {
  let remark1 = {
    id: 1,
    user_name: "User 1",
    body: "Text 1",
    lat: 1.3109734,
    lng: 103.8951836
  };

  let remark2 = {
    id: 2,
    user_name: "User 1",
    body: "Text 2",
    lat: 1.3109423999999998,
    lng: 103.8950867
  };

  let remark3 = {
    id: 3,
    user_name: "User 2",
    body: "I've been there",
    lat: 1.3109423999999998,
    lng: 103.8950867
  };

  let expectedGrouping = [
    {
      count: 1,
      lat: 1.3109734,
      lng: 103.8951836,
      remarks: [remark1]
    },
    {
      count: 2,
      lat: 1.3109423999999998,
      lng: 103.8950867,
      remarks: [remark2, remark3]
    }
  ];

  expect(RemarksGroupByLocaction([remark1, remark2, remark3])).toEqual(expectedGrouping);
});



