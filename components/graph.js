'use client'
import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    ReactFlowProvider,
    applyEdgeChanges, applyNodeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';
import SpecialNodeComponent from './SpecialNodeComponent';
import FloatingEdge from './customedge';
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'You' },
    position: { x: 250, y: 5 }, 
    draggable:true
  },
];


const initialEdges = [];

const careerPaths = [
    { "title": "Mechanical Engineer", "emoji": "🔧" },
    { "title": "Software Developer", "emoji": "💻" },
    { "title": "Biomedical Engineer", "emoji": "🧬" },
    { "title": "Civil Engineer", "emoji": "🏗️" },
    { "title": "Chemical Engineer", "emoji": "⚗️" },
    { "title": "Environmental Engineer", "emoji": "🌱" },
    { "title": "Electrical Engineer", "emoji": "🔌" },
    { "title": "Aerospace Engineer", "emoji": "🚀" },
    { "title": "Nuclear Engineer", "emoji": "☢️" },
    { "title": "Data Scientist", "emoji": "📊" },
    { "title": "Materials Scientist", "emoji": "🔬" },
    { "title": "Pharmaceutical Scientist", "emoji": "💊" },
    { "title": "Robotics Engineer", "emoji": "🤖" },
    { "title": "Agricultural Engineer", "emoji": "🌾" },
    { "title": "Petroleum Engineer", "emoji": "⛽" },
    { "title": "Geotechnical Engineer", "emoji": "🌍" },
    { "title": "Astrophysicist", "emoji": "🌌" },
    { "title": "Ocean Engineer", "emoji": "🌊" },
    { "title": "Computer Systems Analyst", "emoji": "🖥️" },
    { "title": "Information Security Analyst", "emoji": "🔒" }
  ]
  
const nodeDistance = 200; 

const FlowComponent = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
      );
      const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
      );
    const onLoad = (rfi) => {
        if (!rfi) return;
        setReactFlowInstance(rfi);
        // Initialize the position of the 'You' node
        rfi.setNodes((nds) => nds.map((node) => {
            if (node.id === '1') {
                // Position the 'You' node in the center
                const dimensions = rfi.project({ x: 250, y: 5});
                return {
                    ...node,
                    position: dimensions,
                };
            }
            return node;
        }));
    };
    const edgeTypes = {
        floating: FloatingEdge, 
      };
    const addCareerPathNodeAndEdge = useCallback(() => {
        if (nodes.length >= careerPaths.length + 1) { // Plus one to account for the 'You' node
            return;
        }

        const newNodeId = `node_${nodes.length}`;
        const angle = ((Math.PI * 2) / careerPaths.length) * (nodes.length - 1);
        const x = Math.cos(angle) * nodeDistance * (nodes.length - 1);
        const y = Math.sin(angle) * nodeDistance * (nodes.length - 1);

        const newNode = {
            id: newNodeId,
            data: { label: careerPaths[nodes.length - 1].title +careerPaths[nodes.length-1].emoji },
            type:'output',
            position: { x: (nodes.length * nodeDistance) % window.innerWidth, y: Math.floor((nodes.length * nodeDistance) / window.innerWidth) * nodeDistance },
            draggable: true,
        };
        const newEdge = { id: `e1-${newNodeId}`, source: '1', target: newNodeId ,animated:true};

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat(newEdge));

        // if (reactFlowInstance) {
        //     reactFlowInstance.fitView();
        // }
    }, [nodes, reactFlowInstance]);

    useEffect(() => {
        if (!reactFlowInstance) return;
        const intervalId = setInterval(addCareerPathNodeAndEdge, 3000); // Adjust interval as needed

        return () => clearInterval(intervalId);
    }, [addCareerPathNodeAndEdge, reactFlowInstance]);

    return (
        <ReactFlowProvider>
            <div style={{ height: '100vh', width: '100vw' }}>
                <ReactFlow
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    onInit={onLoad}
                    // fitView
                    nodeTypes={{ special: SpecialNodeComponent }} // Define your custom node component if needed
                    edgeTypes={{ floating: FloatingEdge }}
                    attributionPosition="top-right"
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    );
};

export default FlowComponent;