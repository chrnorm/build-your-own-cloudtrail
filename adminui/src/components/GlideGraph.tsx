import { Group } from "@visx/group";
import { PatternCircles } from "@visx/pattern";
import { Bar } from "@visx/shape";
import * as d3Dag from "d3-dag";
import React, { useEffect, useState } from "react";
import { Text } from "@visx/text";
import { ExecutionGraph } from "../../backend-client/types";

const defaultMargin = { top: 10, left: 50, right: 80, bottom: 10 };

function CustomLink({ link }: any) {
  return (
    <line
      x1={link.source.x}
      y1={link.source.y + 60}
      x2={link.target.x}
      y2={link.target.y - 60}
      strokeWidth={1.5}
      stroke="#6b6767"
      transform="rotate(90) scale(1, -1)"
      strokeOpacity={1}
      markerEnd="url(#arrow)"
    />
  );
}

export type TreeProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  graph: ExecutionGraph;
};

export type DagType = d3Dag.Dag<
  {
    parentIds: string[];
    id: string;
    predecessors: string[];
    complete: boolean;
    activated: boolean;
    label: string;
  },
  undefined
>;

export const GlideGraph: React.FC<TreeProps> = ({
  height,
  width,
  margin = defaultMargin,
  graph,
}) => {
  // reference: https://codesandbox.io/s/qzupi?file=/ExampleDag.tsx:893-1611

  const [dag, setDag] = useState<DagType | null>(null);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (graph?.nodes?.length > 0) {
      const nodes = graph.nodes.map((n) => ({
        ...n,
        parentIds: n.predecessors ?? [],
      }));
      const dag = d3Dag.dagStratify()(nodes);
      const nodeRadius = 50;
      const layout = d3Dag
        .sugiyama() // base layout
        .layering(d3Dag.layeringLongestPath())
        .coord(d3Dag.coordCenter())
        .decross(d3Dag.decrossOpt()) // minimize number of crossings
        .nodeSize((node) => [
          (node ? 1.5 : 0.25) * nodeRadius,
          3.4 * nodeRadius,
        ]); // set node size instead of constraining to fit
      const { width, height } = layout(dag as any);
      setDag(dag);
      setLayoutHeight(height);
      setLayoutWidth(width);
    }
  }, [graph]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <defs>
        <marker
          id="arrow"
          viewBox="0 -5 10 10"
          refX="10"
          refY="-.5"
          markerWidth="4"
          markerHeight="4"
          orient="auto"
          fill="#6b6767"
        >
          <path d="M0,-5L10,0L0,5" />
        </marker>
      </defs>
      <PatternCircles
        fill={"#39393d"}
        width={10}
        height={10}
        radius={1}
        id="bg"
      />
      <Bar fill={`url(#bg)`} width={width} height={height} />
      <Group top={margin.top} left={margin.left}>
        {dag?.descendants().map((node: any, i: any) => (
          <Group top={node.x} left={node.y} key={i}>
            <rect
              height={50}
              width={120}
              y={-50 / 2}
              x={-120 / 2}
              fill={
                node.data.complete
                  ? "#009604"
                  : node.data.activated && graph.outcome === "" // only highlight activated nodes if we didn't reach an outcome.
                  ? "#2e7fff"
                  : "#38383b"
              }
              rx={5}
            />
            <Text
              fontSize={12}
              fill={"white"}
              verticalAnchor="middle"
              textAnchor="middle"
              width={100}
            >
              {node.data.label}
            </Text>
          </Group>
        ))}
        {dag?.links().map((link: any, i: any) => (
          <CustomLink key={`link-${i}`} link={link} />
        ))}
      </Group>
    </svg>
  );
};
