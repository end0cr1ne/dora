var graph = require('graphlib');
var id=require('uuid/v4');
var g=new graph.Graph({directed:false});

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
var ref={
     lift7_new: '84c1bc43-afdc-41ea-82fa-97476ecab2f2',
   lift7_old:'caafd48a-d410-483c-b8c3-908225d661b5',
    be_elex: '7ae9ceb9-f868-4548-a686-81b09654b99a',
    project_lab: 'd28df946-c9d0-4e98-9b7f-474eac241c94',
    advanced_communication_lab: '318e9f9c-8945-48b6-98aa-f5bf53699d09',
    iedc_lab: '82aa8eb8-732d-4488-92b5-ef999343315e',
    girls_restroom: '7e9028fb-1dc5-43b1-8007-8fa8599ef74a',
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
    p7_8: '4986d330-46d3-4f74-9e8c-56b79e26d6bb',
    p7_9: '940540c7-8ed7-42af-b564-457a76599ddf',
    p7_10: 'beadcb43-dd8a-4dc2-8c8b-fbbb1db2e4c5',
    p7_11: 'a6f95197-c144-446c-9110-1dc04eddf7ba',
    p7_12: '45d1c767-43aa-466d-9c40-ef816394b9db'
};


for(var i in ref){
    //console.log(i)
    g.setNode(ref[i],i);
}
g.setEdge(ref.p7_2,ref.p7_0);
g.setEdge(ref.p7_0,ref.be_elex);
g.setEdge(ref.lift7_new,ref.p7_1);
g.setEdge(ref.p7_2,ref.p7_1);
g.setEdge(ref.p7_3,ref.p7_2);
g.setEdge(ref.p7_3,ref.advanced_communication_lab);
g.setEdge(ref.p7_4,ref.p7_3);
g.setEdge(ref.p7_4,ref.project_lab);
g.setEdge(ref.p7_5,ref.iedc_lab);
g.setEdge(ref.p7_5,ref.girls_restroom);
g.setEdge(ref.p7_5,ref.p7_4);
g.setEdge(ref.be_comps,ref.p7_6);
g.setEdge(ref.te_comps,ref.p7_6);
g.setEdge(ref.p7_6,ref.p7_7);
g.setEdge(ref.p7_7,ref.se_comps);
g.setEdge(ref.p7_7,ref.p7_8);
g.setEdge(ref.p7_8,ref.p7_9);
g.setEdge(ref.p7_8,ref.p7_10);

// }
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

console.log(g.edges());

for(i of g.edges())
{
    console.log(g.node(i.v), g.node(i.w))

}

console.log(graph.alg.dijkstra(g, '4fd1aaf7-e18b-469e-a6b4-a2fb2d1813e2'));