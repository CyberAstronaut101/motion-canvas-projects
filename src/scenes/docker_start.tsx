import { Circle, Layout, Rect, Txt, Node, Line } from '@motion-canvas/2d/lib/components';
import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, chain, waitFor } from '@motion-canvas/core/lib/flow';
import { linear } from '@motion-canvas/core/lib/tweening';
import { Direction } from '@motion-canvas/core/lib/types';
import { beginSlide, createRef } from '@motion-canvas/core/lib/utils';
import { CodeBlock, edit, insert, lines, remove } from '@motion-canvas/2d/lib/components/CodeBlock';
import { Vector2 } from '@motion-canvas/core/lib/types';
import { createSignal } from '@motion-canvas/core/lib/signals';
import { Logger } from '@motion-canvas/core';
import { useLogger } from '@motion-canvas/core/lib/utils';

export default makeScene2D(function* (view) {
    const logger = useLogger();
    // Create your animations here

    const firstRect = createRef<Rect>();
    const secondRect = createRef<Rect>();

    const group = createRef<Node>();

    const containerGroup = createRef<Layout>();

    // CodeBlock Right Side
    const codeBlockGroup = createRef<Layout>();
    const codeRef = createRef<CodeBlock>();
    const connectionLine = createRef<Line>();


    /*========== Styling for App Rectangles  ==========*/
    const app1_rect = createRef<Rect>();
    app1_rect().fill('#d46c6c');


    view.add(
        <>
            <Layout ref={containerGroup} direction={'column'} width={600} gap={20} x={-500} layout>
                <Node ref={group} opacity={0}>
                    <Rect ref={firstRect} height={240} fill={'#ff6470'}>
                        <Txt
                            text={"VSCode/App Container"}
                            fontFamily={'Play'}
                            fontWeight={800}
                            fill={'#ffffff'}
                        />
                    </Rect>
                    <Rect ref={secondRect} height={240} fill={'#ff6470'} />
                </Node>
            </Layout>
            <Layout ref={codeBlockGroup} x={200} layout>
                <CodeBlock ref={codeRef} fontSize={35}></CodeBlock>
            </Layout>
            <Line
                ref={connectionLine}
                opacity={0}
                lineWidth={12}
                stroke={'white'}
                arrowSize={20}
                endArrow
                points={[
                    [
                        -firstRect().absolutePosition().x - firstRect().width() / 2,
                        firstRect().position.y() + firstRect().height() / 2
                    ],
                    [
                        -secondRect().absolutePosition().x - secondRect().width() / 2,
                        secondRect().position.y() - secondRect().height() / 2]
                ]}

            />
        </>
    )

    // const fromFirstRectY = createSignal(firstRect().getState()[0] + firstRect().getState().height() / 2)
    // logger.debug(firstRect().getState().x.toString())

    // yield* beginSlide('Initial Layout')

    // # Add Text To Title and animate typing
    // yield* waitFor(.5);
    yield* containerGroup().gap(20, 1).to(300, 1);

    yield* chain(
        group().opacity(0, 1).to(1, 1),
        waitFor(.5),
        containerGroup().gap(20, 1).to(300, 1),
        connectionLine().opacity(1, 1)
    )

    // yield* group().scale(.5, 1);

    // yield* all(
    //     group().scale(.5, 1),
    //     group().position.x(300, 1).to(-300, 1)
    // )
    // yield* beginSlide('Initial Layout2')


    // view.add(
    //     <>
    //         <Line
    //             ref={connectionLine}
    //             opacity={0}
    //             lineWidth={12}
    //             stroke={'white'}
    //             arrowSize={20}
    //             endArrow
    //             points={[
    //                 [
    //                     -firstRect().absolutePosition().x - firstRect().width() / 2,
    //                     firstRect().position.y() + firstRect().height() / 2
    //                 ],
    //                 [
    //                     -secondRect().absolutePosition().x - secondRect().width() / 2,
    //                     secondRect().position.y() - secondRect().height() / 2]
    //             ]}

    //         />
    //     </>
    // )

    // logger.debug('initial position() ' + firstRect().position.x())
    // logger.debug('getState() ' + firstRect().position().x)


    yield* connectionLine().opacity(1, 1);

    // yield* beginSlide('Code Intro');


    yield* codeRef().edit(2, false)`
    version: "3.8"
    services:
      api:
        #image: joon/nestjs-dockerized
              build: 
                dockerfile: Dockerfile
                context: .
              depends_on:
                - postgres
              environment:
                DATABASE_URL: postgres:
                PORT: 3000
              ports:
                - "8080:3000"
      
      postgres:
            image: postgres:latest
            ports:
                - "5432:5432"
            environment: 
                POSTGRES_USER: user
                POSTGRES_PASSWORD: password
                POSTGRES_DB: db`;

    yield* codeRef().edit(0)`
    version: "3.8"
    services:
      api:
        #image: joon/nestjs-dockerized
              build: 
                dockerfile: Dockerfile
                context: .
              depends_on:
                - postgres
              environment:
                DATABASE_URL: postgres:
                PORT: 3000
              ports:
                - "8080:3000"
      
      postgres:
            image: postgres:latest
            ports:
                - ${remove('"5432:5432"')}${insert('"5432:5432"')}
            environment: 
                POSTGRES_USER: user
                POSTGRES_PASSWORD: password
                POSTGRES_DB: db`;

    yield* waitFor(1);
    yield* codeRef().selection(lines(0, Infinity), 0);

    // yield* codeRef().edit(2, true)`
    // version: "3.8"
    // services:
    //     api:
    //     #image: joon/nestjs-dockerized
    //             build: 
    //             dockerfile: Dockerfile
    //             context: .
    //             depends_on:
    //             - postgres
    //             environment:
    //             DATABASE_URL: postgres:
    //             PORT: 3000
    //             ports:
    //             - "8080:3000"

    //     postgres:
    //         image: postgres:latest
    //         ports:
    //             - "5432:5432"
    //         environment: 
    //             POSTGRES_USER: user
    //             POSTGRES_PASSWORD: password
    //             POSTGRES_DB: db`;

    // yield* codeRef().edit(5, false)`var myBool${insert(' = true')};`;
    // yield* waitFor(0.6);
    // yield* codeRef().edit(1.2)`var myBool = ${edit('true', 'false')};`;
    // yield* waitFor(0.6);
    // yield* all(
    //     codeRef().selection(lines(0, Infinity), 1.2),
    //     codeRef().edit(1.2, false)`var my${edit('Bool', 'Number')} = ${edit(
    //         'false',
    //         '42',
    //     )};`,
    // );
    // yield* waitFor(0.6);
    // yield* codeRef().edit(1.2, false)`var myNumber${remove(' = 42')};`;
    // yield* waitFor(0.6);
    // yield* codeRef().edit(1.2, false)`var my${edit('Number', 'Bool')};`;
    // yield* waitFor(0.6);

    yield* waitFor(3); // Just ending hold on final frame

});
