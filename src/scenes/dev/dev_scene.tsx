import { makeScene2D } from "@motion-canvas/2d";
import { Layout, Node, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { all, chain, waitFor } from "@motion-canvas/core/lib/flow";
import { Center } from "@motion-canvas/core/lib/types";
import { createRef } from "@motion-canvas/core/lib/utils";

export default makeScene2D(function* (view) {

    view.fontFamily('Play');
    view.fontWeight(800);

    /*========== Styling for App Rectangles  ==========*/

    const vm_stack = createRef<Layout>();
    // Top Row App Nodes
    const app1_node = createRef<Node>();       // Node containing app1 | bins/lib | guestOS
    const app2_node = createRef<Node>();
    const app3_node = createRef<Node>();

    // Middle Hypervisor Rect
    const hypervisorRect = createRef<Rect>();
    // Bottom Host Rect
    const infrastructureRect = createRef<Rect>();

    // #region styles
    const app1_style = {
        fill: '#3E885B',
        padding: 20
    }

    const app2_style = {
        fill: '#C0D7BB',
        padding: 20
    }

    const app3_style = {
        fill: '#BEDCFE',
        padding: 20
    }
    // #endregion


    view.add(
        <>
            <Layout ref={vm_stack} direction={'column'} width={775} gap={20} layout>

                <Txt text={"Virtual Machines"} fontSize={80} alignContent={'center'} justifyContent={'center'} fill={'#ffffff'} />


                {/* Top Row Host/App Stacks */}
                <Layout direction={"row"} gap={15} layout width={775}>

                    <Layout direction={'column'} justifyContent={'space-between'} gap={20} layout>
                        <Node ref={app1_node} opacity={0}>
                            <Rect {...app1_style} justifyContent={'center'}><Txt text={"App 1"} /></Rect>
                            <Rect {...app1_style} justifyContent={'center'}><Txt text={"Bins/Lib"} /></Rect>
                            <Rect {...app1_style} justifyContent={'center'}><Txt text={"Guest OS"} /></Rect>
                        </Node>
                    </Layout>
                    <Layout direction={'column'} gap={20} layout>
                        <Node ref={app2_node} opacity={0}>
                            <Rect {...app2_style} justifyContent={'center'}><Txt text={"App 2"} /></Rect>
                            <Rect {...app2_style} justifyContent={'center'}><Txt text={"Bins/Lib"} /></Rect>
                            <Rect {...app2_style} justifyContent={'center'}><Txt text={"Guest OS"} /></Rect>
                        </Node>
                    </Layout>
                    <Layout direction={'column'} gap={20} layout>
                        <Node ref={app3_node} opacity={0}>
                            <Rect {...app3_style} justifyContent={'center'}><Txt text={"App 3"} /></Rect>
                            <Rect {...app3_style} justifyContent={'center'}><Txt text={"Bins/Lib"} /></Rect>
                            <Rect {...app3_style} justifyContent={'center'}><Txt text={"Guest OS"} /></Rect>
                        </Node>
                    </Layout>

                </Layout>

                <Rect ref={hypervisorRect} opacity={0} height={240} fill={'#6594a3'} justifyContent={'center'} alignItems={'center'}>
                    <Txt text={"Hypervisor"} />
                </Rect>
                <Rect ref={infrastructureRect} opacity={0} height={240} fill={'#7d6b6a'}>
                    <Txt alignContent={'center'} justifyContent={'center'} alignItems={'center'} width={900} text={"Host Infrastructure"} />
                </Rect>


            </Layout>

        </>
    )

    yield* waitFor(.5);

    // yield* infrastructureRect().opacity(1, 1);
    // yield* hypervisorRect().opacity(1, 1);
    // yield* app1_node().opacity(1, .75);
    // yield* app2_node().opacity(1, .75);
    // yield* app3_node().opacity(1, .75);

    yield* chain(
        infrastructureRect().opacity(1, 1),
        hypervisorRect().opacity(1, 1),
        app1_node().opacity(1, 1),
        app2_node().opacity(1, 1),
        app3_node().opacity(1, 1),
    )

    yield* vm_stack().position.x(-500, 1);



    /**================================================== *
     * ==========  Add Docker Stack Difference  ========== *
     * ================================================== */
    const docker_stack = createRef<Layout>();

    const docker_app1_node = createRef<Node>();
    const docker_app2_node = createRef<Node>();
    const docker_app3_node = createRef<Node>();

    const container_engineRect = createRef<Rect>();
    const container_osRect = createRef<Rect>();
    const container_infrastructure_Rect = createRef<Rect>();



    view.add(
        <>
            <Layout x={500} ref={docker_stack} direction={'column'} width={775} gap={20} layout>
                <Txt text={"Containers"} fontSize={80} fill={'#ffffff'} alignContent={'center'} justifyContent={'center'} />
            </Layout>
        </>
    )



    // yield* all(
    //     app1_node().opacity(1, .5),
    //     app2_node().opacity(1, 2.5),
    //     app3_node().opacity(1, 3),


    // )


    // yield* waitFor(2);
});