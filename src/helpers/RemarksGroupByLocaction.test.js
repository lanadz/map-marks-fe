import RemarksGroupByLocaction from './RemarksGroupByLocaction';

describe('It groups remarks by location and respects zoom level', () => {
  it('groups remarks based on location', () => {
    const remark1 = {
      id: 1,
      user_name: 'User 1',
      body: 'Text 1',
      lat: 1.3108734,
      lng: 103.8951236,
    };

    const remark2 = {
      id: 2,
      user_name: 'User 1',
      body: 'Text 2',
      lat: 2.3109423999999998,
      lng: 105.8950867,
    };

    const remark3 = {
      id: 3,
      user_name: 'User 2',
      body: "I've been there",
      lat: 1.3109423999999998,
      lng: 103.8950867,
    };

    const expectedGrouping = [
      {
        id: 0,
        count: 2,
        lat: '1.3109',
        lng: '103.8951',
        remarks: [remark1, remark3],
      },
      {
        id: 1,
        count: 1,
        lat: '2.3109',
        lng: '105.8951',
        remarks: [remark2],
      },
    ];

    expect(RemarksGroupByLocaction([remark1, remark2, remark3])).toEqual(expectedGrouping);
  });


  it('groups remarks respecting zoom level', () => {
    const remarkDecPlace7 = {
      id: 1,
      user_name: 'User 1',
      body: 'Text 1',
      lat: 109.0000009,
      lng: 109.0000009,
    };
    const remarkDecPlace6 = {
      id: 2,
      user_name: 'User 1',
      body: 'Text 2',
      lat: 109.000009,
      lng: 109.000009,
    };
    const remarkDecPlace5 = {
      id: 3,
      user_name: 'User 1',
      body: 'Text 3',
      lat: 109.00009,
      lng: 109.00009,
    };
    const remarkDecPlace4 = {
      id: 4,
      user_name: 'User 1',
      body: 'Text 4',
      lat: 109.0009,
      lng: 109.0009,
    };
    const remarkDecPlace3 = {
      id: 5,
      user_name: 'User 1',
      body: 'Text 5',
      lat: 109.009,
      lng: 109.009,
    };
    const remarkDecPlace2 = {
      id: 6,
      user_name: 'User 1',
      body: 'Text 6',
      lat: 109.09,
      lng: 109.09,
    };
    const remarkDecPlace1 = {
      id: 7,
      user_name: 'User 1',
      body: 'Text 7',
      lat: 109.9,
      lng: 109.9,
    };


    const remarks = [
      remarkDecPlace7,
      remarkDecPlace6,
      remarkDecPlace5,
      remarkDecPlace4,
      remarkDecPlace3,
      remarkDecPlace2,
      remarkDecPlace1,
    ];

    const expectedGroupingForTheBiggestZoom = [
      {
        id: 0,
        count: 5,
        lat: '109.0',
        lng: '109.0',
        remarks: [
          remarkDecPlace7,
          remarkDecPlace6,
          remarkDecPlace5,
          remarkDecPlace4,
          remarkDecPlace3,
        ],
      },
      {
        id: 1,
        count: 1,
        lat: '109.1',
        lng: '109.1',
        remarks: [remarkDecPlace2],
      },
      {
        id: 2,
        count: 1,
        lat: '109.9',
        lng: '109.9',
        remarks: [remarkDecPlace1],
      },
    ];

    expect(RemarksGroupByLocaction(remarks, 1)).toEqual(expectedGroupingForTheBiggestZoom);
  });
});
