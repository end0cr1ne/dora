var graph = require('graphlib');
var id = require('uuid/v4');
var fs = require('fs');
var g = new graph.Graph({directed: false});

//var pathListAll = require('./pathListAll');
//ctrl+alt+l reformat webstorm code

// var ref = {
//     lift7_new:id(),
//      lift7_old:id(),
//     be_elex:id(),
//     project_lab:id(),
//     advanced_communication_lab:id(),
//     iedc_lab:id(),
//     girls_restroom:id(),
//     be_comps:id(),
//     te_comps:id(),
//     se_comps:id(),
//     staff_room:id(),
//     p7_1:id(),
//     p7_2:id(),
//     p7_3:id(),
//     p7_4:id(),
//     p7_5:id(),
//     p7_6:id(),
//     p7_7:id(),
//     p7_8:id(),
//     p7_9:id(),
//     p7_10:id(),
//     p7_11:id(),
//     p7_12:id()
// }
//

//var ref8 = {
//     lift8_new:id(),
//      lift8_old:id(),
//     be_it:id(),
//     it_lab1:id(),
//     it_lab2:id(),
//     it_lab3:id(),
//     girls8_restroom:id(),
//      it_lab4:id(),
//      it_lab5:id(),
//      it_lab6:id(),
//      it_lab7:id(),
//
//     te_it:id(),
//     se_it:id(),
//     staff_room:id(),
//     p8_1:id(),
//     p8_2:id(),
//     p8_3:id(),
//     p8_4:id(),
//     p8_5:id(),
//     p8_6:id(),
//     p8_7:id(),
//     p8_8:id(),
//     p8_9:id(),
//     p8_10:id(),
//     p8_11:id(),
//     p8_12:id()
//}

var ref8 = {
    lift8_new: '204f76i9-d871-4d59-aacc-e0fcabea409e',
    lift8_old: '41c7iaid-6742-4b61-9b69-776356718d8c',
    lift8_staff: '3b9i5f0i-b5i1-47ea-i63i-315bbi6ci075',
    be_it: '0bbd8307-1e0b-4563-8dd8-0f2aa24a6879',
    it_lab1: '19fd6d17-9f61-49f5-b175-f8d396881b5a',
    it_lab2: '2d964483-28aa-4fd3-9aad-49105c98945e',
    it_lab3: '97026ad3-6a9c-424f-a16b-1bcc292b59c4',
    girls8_restroom: 'a9d68b69-2ec5-4f9a-8d17-6876a8e75877',
    middle8_restroom: 'iota5f04-i531-4man-86i6-315bba6ca075',
    it_lab4: '726417e9-9675-49dd-b28e-204ca702c0b7',
    it_lab5: '3589f79e-56fd-4881-9cf1-b0607267a0b9',
    it_lab6: '785f925c-37df-4401-ae6a-7397eb8210b1',
    it_lab7: '174c5c1b-2f11-4c69-ad47-b07a5c4fded9',
    te_it: '4534f76f-a6a9-45b2-9429-e7ff10bc19f8',
    se_it: '4c13c5f4-7dfa-47a9-8527-5e269de71029',
    staff_room: 'f5b5e14b-42a1-4917-b49d-ed946f5eb55c',
    p8_0: '9b48e414-5505-4cbc-b2ee-e3349d41ab85',
    p8_1: '463bbf3a-22f3-4598-a453-335eaf41a1c2',
    p8_2: 'cc11acba-dea5-4ad7-93f3-7754dfdea15d',
    p8_3: '63bee372-2bdb-46c4-b940-a2539a56f0d9',
    p8_4: '33c97b5f-18b4-470b-a334-da49b687767b',
    p8_5: '60c5cdc9-cc48-4a52-9ce4-2ff8d6a35961',
    p8_6: '07500022-0dbe-4b73-913e-3a18cf3edd66',
    p8_7: '0e9baf3f-38de-4f32-a564-2a3f8785f9a2',
    p8_8: 'e08c370d-2d0c-448d-9738-46fbcb34cffb',
    p8_9: 'c56bed75-3fa6-4f80-94e5-0a19b2c9b23a',
    p8_10: 'a2d49a23-1e49-4ef5-83e9-63fe1e74d882',
    p8_11: '9ecd0d20-a392-4104-8336-8c4219d6fc4f',
    p8_12: '952d8db0-4e17-4adf-9875-b1d943aa693b',
    p8_13: 'bb859772-cbc9-4ab1-s45e-96fd0a503210',
    p8_14: 'f703b318-88ce-4008-9787-e6334047d4e9',
    p8_15: '0d675a96-696b-4117-a5b3-4ad07bb5fs3d',
    p8_16: 'dd931e89-9e4e-4423-be4f-f450c2fc6337',
    p8_17: 'fv933333-950e-44t3-b342-e450c3fc6c37',
    p8_18: '95e99bi4-df92-4621-a9eb-ca4fb39dc4a2',
    p8_19: '43157700-f57c-4e14-a153-e807eb0f8e8d',
    p8_20: '4a6edd30-f3e5-495b-8375-69f0a5dfid62',
    p8_21: '617a8eib-a52e-4ce7-a721-e3if30a7icbb',
    p8_22: 'f9171eid-5i06-45e1-8i32-1eac5e39e152',
    p8_23: '8b7c9ic9-8980-429f-9idc-62e72i18d40d',
    p8_23: '0ii5c784-9i80-4129-88a5-4di6ff16cdf9',
    p8_24: 'e7c9ci6b-3i8c-4ffc-aid9-b8ie56da6c91',
    p8_25: '13e0ei64-aie4-4544-83b8-cd6i425d6878',
    p8_26: '3b9i5f0i-b531-47ea-8636-315iba6ca075'


}
//console.log('8th floor');
//console.log(ref8);


var ref = {
    lift7_new: '84c1bc43-afdc-41ea-82fa-97476ecab2f2',
    lift7_old: 'caafd48a-d410-483c-b8c3-908225d661b5',
    lift7_staff: 'b11107fb-133f-4532-a3d0-32a28b63c6f5',
    be_elex: '7ae9ceb9-f868-4548-a686-81b09654b99a',
    project_lab: 'd28df946-c9d0-4e98-9b7f-474eac241c94',
    mac_lab: '994ec5aa-d543-4753-9a5f-de374f4e9c6e',
    cc8: 'd7cd9cf7-ec6d-44ae-8322-c70efe7878e1',
    cc7: 'ce0d5735-d3ea-4bb8-bcbb-97b4accd693b',
    advanced_communication_lab: '318e9f9c-8945-48b6-98aa-f5bf53699d09',
    iedc_lab: '82aa8eb8-732d-4488-92b5-ef999343315e',
    girls_restroom: '7e9028fb-1dc5-43b1-8007-8fa8599ef74a',
    middle_restroom: 'b11107fb-133f-4532-a3d0-32a28b63c6f5',
    staff_restroom: '916cc715-4b16-45b8-ba2d-83d7cde9525e',
    be_comps: '335f7b63-8c95-4e4c-87ad-dae5d493d5ec',
    te_comps: 'e3e77d28-7922-4a6f-88b3-0a99b79b9b5e',
    se_comps: '02fe554a-81de-48a0-af26-679f44e810e3',
    staff_room: '6c93fb16-812d-4819-9d0e-5e4c30e5b878',
    p7_0: '4fd1aaf7-e18b-469e-a6b4-a2fb2d1813e2',
    p7_1: '4fd1aaf7-e18b-469e-a6b4-a2fb2d1815e1',
    p7_2: 'f6764e24-98e7-4084-b7c8-65158f05c95c',
    p7_3: '319b80e5-bd92-4439-be5b-9564c5046815',
    p7_4: 'cf0c5921-b3ee-40be-8d88-605aac395f2d',
    p7_5: 'fe664dc0-a7b9-4b1d-bb83-60572b099b6c',
    p7_6: '62b0d0f1-7a1a-4b57-ac6e-2eb98b5878c7',
    p7_7: '2e9e4a9f-4dfe-42e3-9818-792bbdd7fdca',
    p7_8: '49z6d330-46d3-4f74-9e8c-56b79e26d6bb',
    p7_9: '940540c7-8ed7-42af-b564-457a76599ddf',
    p7_10: 'beadcb43-dd8a-4dc2-8c8b-fbbb1db2e4c5',
    p7_11: 'a6f95197-c144-446c-9110-1dc04eddf7ba',
    p7_12: '45d1c767-43aa-466d-9c40-ef816394b9db',
    p7_13: 'bb859i72-cbc9-4ab1-a75e-96fd0a503210',
    p7_14: 'f703b318-88ce-4008-9787-e63240bc84e9',
    p7_15: '0d675a96-696b-4117-a5b3-4ad07bb5933d',
    p7_16: 'dd931e89-9e4e-4423-bi4a-e450c3fc6c37',
    p7_17: 'fv933333-950e-4423-be4a-e450c3fc6c37',
    p7_18: '95e9ii74-df92-463e-a9eb-ca4fb39dc4a2',
    p7_19: '43157700-f57c-4e1d-a553-e807eb0f8e8d',
    p7_20: '4a6edd30-f3e5-495b-8075-6ffea5d8ed62',
    p7_21: '617a8e4b-a52e-4ce7-a721-e37f30a76cbb',
    p7_22: 'f9171e1d-5506-45e1-8b32-1eac5e39oi52',
    p7_23: '8b7c97c9-8980-429f-9adc-62e72a18d40d',
    p7_23: '0245c784-9e80-4129-88a5-4d56ff16cdf9',
    p7_24: 'e7c9cf6b-3a8c-4ffc-a0d9-b89e56da6c91',
    p7_25: '13e0e064-a0e4-4544-83b8-cd6f425d6878',
    p7_26: '3b985f04-b531-47ea-8636-315bba6ca075'

    //  p8_1: '',
    // p8_2:
};


for (var i in ref) {
    g.setNode(ref[i], i);
}

for (var i in ref8) {
    g.setNode(ref8[i], i);
}
g.setEdge(ref8.p8_0, ref8.p8_2);
g.setEdge(ref8.p8_1, ref8.p8_2);
g.setEdge(ref8.p8_2, ref8.p8_3);
g.setEdge(ref8.p8_3, ref8.p8_4);
g.setEdge(ref8.p8_3, ref8.it_lab1);
g.setEdge(ref8.p8_4, ref8.it_lab2);
g.setEdge(ref8.p8_5, ref8.it_lab3);
g.setEdge(ref8.p8_4, ref8.p8_5);
g.setEdge(ref8.p8_5, ref8.p8_6);
g.setEdge(ref8.p8_6, ref8.te_it);
g.setEdge(ref8.p8_6, ref8.it_lab4);
g.setEdge(ref8.p8_7, ref8.it_lab5);
g.setEdge(ref8.p8_8, ref8.it_lab6);
g.setEdge(ref8.p8_10, ref8.it_lab7);
g.setEdge(ref8.p8_6, ref8.p8_7);
g.setEdge(ref8.p8_7, ref8.se_it);
g.setEdge(ref8.p8_7, ref8.p8_8);
g.setEdge(ref8.p8_8, ref8.p8_9);
g.setEdge(ref8.p8_9, ref.p7_9); // Linking 7th and 8th floor via middle stairs
g.setEdge(ref8.p8_8, ref8.p8_10);
g.setEdge(ref8.p8_10, ref8.staff_room);
g.setEdge(ref8.be_it, ref8.p8_0);
g.setEdge(ref8.p8_10, ref8.it_lab7);
g.setEdge(ref8.p8_10, ref8.p8_11);
g.setEdge(ref8.p8_11, ref8.lift8_staff);
g.setEdge(ref8.p8_11, ref8.p8_12);
g.setEdge(ref8.p8_12, ref8.middle8_restroom);
g.setEdge(ref8.p8_12, ref8.p8_13);
g.setEdge(ref8.p8_13, ref8.p8_14);
g.setEdge(ref8.p8_14, ref8.p8_15);
g.setEdge(ref8.p8_15, ref8.p8_16);
g.setEdge(ref8.p8_16, ref8.p8_17);
g.setEdge(ref8.p8_17, ref8.lift8_old);
g.setEdge(ref8.p8_16, ref8.p8_18);
g.setEdge(ref8.p8_18, ref8.staff_restroom);
g.setEdge(ref8.p8_18, ref8.p8_19);
g.setEdge(ref8.p8_19, ref8.p8_20);
g.setEdge(ref8.p8_20, ref8.p8_21);
g.setEdge(ref8.p8_21, ref8.p8_22);
g.setEdge(ref8.p8_22, ref8.p8_23);

//7th floor Edges
g.setEdge(ref.p7_1, ref8.p8_1); //Linking via new lift
g.setEdge(ref.p7_0, ref8.p8_0); //Linking 7th to 8th floor via stairs
g.setEdge(ref.p7_2, ref.p7_0);
g.setEdge(ref.p7_0, ref.be_elex);
g.setEdge(ref.lift7_new, ref.p7_1);
g.setEdge(ref.p7_2, ref.p7_1);
g.setEdge(ref.p7_3, ref.p7_2);
g.setEdge(ref.p7_3, ref.advanced_communication_lab);
g.setEdge(ref.p7_4, ref.p7_3);
g.setEdge(ref.p7_4, ref.project_lab);
g.setEdge(ref.p7_5, ref.iedc_lab);
g.setEdge(ref.p7_5, ref.girls_restroom);
g.setEdge(ref.p7_5, ref.p7_4);
g.setEdge(ref.p7_5, ref.p7_6);
g.setEdge(ref.be_comps, ref.p7_6);
g.setEdge(ref.te_comps, ref.p7_6);
g.setEdge(ref.p7_6, ref.p7_7);
g.setEdge(ref.p7_7, ref.se_comps);
g.setEdge(ref.p7_7, ref.p7_8);
g.setEdge(ref.p7_7, ref.mac_lab);
g.setEdge(ref.p7_8, ref.cc8);
g.setEdge(ref.p7_8, ref.p7_9);
g.setEdge(ref.p7_8, ref.p7_10);
g.setEdge(ref.p7_10, ref.staff_room);
g.setEdge(ref.p7_10, ref.cc7);
g.setEdge(ref.p7_10, ref.p7_11);
g.setEdge(ref.p7_11, ref.lift7_staff);
g.setEdge(ref.p7_11, ref.p7_12);
g.setEdge(ref.p7_12, ref.middle_restroom);
g.setEdge(ref.p7_12, ref.p7_13);
g.setEdge(ref.p7_13, ref.p7_14);
g.setEdge(ref.p7_14, ref.p7_15);
g.setEdge(ref.p7_15, ref.p7_16);
g.setEdge(ref.p7_16, ref.p7_17);
g.setEdge(ref.p7_17, ref.lift7_old);
g.setEdge(ref.p7_16, ref.p7_18);
g.setEdge(ref.p7_18, ref.staff_restroom);
g.setEdge(ref.p7_18, ref.p7_19);
g.setEdge(ref.p7_19, ref.p7_20);
g.setEdge(ref.p7_20, ref.p7_21);
g.setEdge(ref.p7_21, ref.p7_22);
g.setEdge(ref.p7_22, ref.p7_23);
g.setEdge(ref.p7_23, ref8.p8_23); //Linking 7th and 8th floors via back stairs


// }.
//
// g.setNode(ref.lift,'lift');
// g.setNode(id(),'be_elex');
// g.setNode(id(),'mac_lab');
// g.setNode(id(),'project_lab');
// g.setNode(id(),'iedc_lab');
// g.setNode(id(),'random_lab');
// g.setNode(id(),'restroom');
// g.setNode(id(),'be_comps');
// g.setNode(id(),'te_comps');
// g.setNode(id(),'se_comps');
// g.setNode(id(),'staff_room');
// g.setNode(id(),'cc7');
// g.setNode(id(),'cc8');
// g.setNode(id(),'path');
// g.setNode(id(),'lift');
// g.setNode(id(),'lift');
//
//for (i of g.edges()
//)
//{
//    console.log(g.node(i.v), g.node(i.w))
//
//}
var source = ref.middle_restroom;
//var pathListAll = graph.alg.dijkstraAll(g,  null, function (v) {
//    return g.nodeEdges(v);
//});
//
//fs.writeFileSync('PathListAll.js', JSON.stringify(pathListAll));
//var pathList = pathListAll[source];
//console.log(pathList);

var pathList = graph.alg.dijkstra(g, source, null, function (v) {
    return g.nodeEdges(v)
});
var pred = pathList[ref8.middle8_restroom].predecessor;
var tiles = [];
while (pred != source) {
    tiles.push(g.node(pred));
    pred = pathList[pred].predecessor;
}

console.log(tiles);


