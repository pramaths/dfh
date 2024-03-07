'use client'
import React, { useState, useEffect, useCallback,useMemo } from 'react';
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
import FloatingEdge from './FloatingEdge';
import Sidebar from './SideBar';
import { useSelections } from '../context/GraphDataContext';
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'You' },
    position: { x: 550, y: 5 }, 
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
    // { "title": "Nuclear Engineer", "emoji": "☢️" },
    // { "title": "Data Scientist", "emoji": "📊" },
    // { "title": "Materials Scientist", "emoji": "🔬" },
    // { "title": "Pharmaceutical Scientist", "emoji": "💊" },
    // { "title": "Robotics Engineer", "emoji": "🤖" },
    // { "title": "Agricultural Engineer", "emoji": "🌾" },
    // { "title": "Petroleum Engineer", "emoji": "⛽" },
    // { "title": "Geotechnical Engineer", "emoji": "🌍" },
    // { "title": "Astrophysicist", "emoji": "🌌" },
    // { "title": "Ocean Engineer", "emoji": "🌊" },
    // { "title": "Computer Systems Analyst", "emoji": "🖥️" },
    // { "title": "Information Security Analyst", "emoji": "🔒" }
  ]
  
const nodeDistance = 300; 
const FlowComponent = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sidebarContent, setSidebarContent] = useState('');
    const [sidebardetials,setSidebardetails]=useState('')
    const { selections } = useSelections();

    const onDoubleClick = (event, node) => {
        console.log('Node double-clicked:', node);
        setSidebarContent(node.data.label);
        setIsSidebarOpen(true);
    };

    useEffect(() => {
      // Here you would send the selections to your service
      console.log(selections);
      // Replace console.log with your function to send data to ChatGPT or similar service
    }, [selections]);
    const onNodeClick = (event, node) => {
        console.log("Node clicked:", node);
        setSidebardetails('Software Engineering is a systematic engineering approach to software development.A Software Engineer applies engineering principles to design, develop, maintain, test, and evaluate computer software.This field is vast and offers numerous opportunities for specialization.')
        setSelectedNode(node);
        setIsSidebarOpen(true); // Open your sidebar upon clicking a node
        setSidebarContent(node.data.label); // Set the sidebar content based on the clicked node
    };
    
    const nodeTypes = useMemo(
        () => ({
            special: SpecialNodeComponent, 
        }),
        [],
      );
    const edgeTypes = useMemo(
        () => ({
            floating: FloatingEdge
        }),
        [],
      );
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
                const dimensions = rfi.screenToFlowPosition({ x: 700, y: 200});
                return {
                    ...node,
                    position: dimensions,
                };
            }
            return node;
        }));
    };
  
    const addCareerPathNodeAndEdge = useCallback(() => {
        if (nodes.length >= careerPaths.length + 1) { // Plus one to account for the 'You' node
            return;
        }

        const newNodeId = `node_${nodes.length}`;
        const angle = ((Math.PI * 3) / careerPaths.length) * (nodes.length - 1);
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
        const intervalId = setInterval(addCareerPathNodeAndEdge, 1000); // Adjust interval as needed

        return () => clearInterval(intervalId);
    }, [addCareerPathNodeAndEdge, reactFlowInstance]);

    return (
        <div>
        <ReactFlowProvider>
            <div style={{ position:"relative", height: '100vh', width: '100vw' }}>
                <ReactFlow
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    onInit={onLoad}
                   onNodeClick={onNodeClick}
                    // onNodeDoubleClick={onDoubleClick}
                    nodeTypes={nodeTypes} // Define your custom node component if needed
                    edgeTypes={ edgeTypes}
                
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
                {/* {isSidebarOpen && selectedNode && (
    <Sidebar 
        content={sidebarContent} 
        closeSidebar={() => {
            setIsSidebarOpen(false);
            setSelectedNode(null); // Reset selected node state on closing the sidebar
            
        }} 
    />
)} */}
 <Sidebar 
                        show={isSidebarOpen}
                        content={sidebarContent}
                        details={sidebardetials}
                        closeSidebar={() => {
                            setIsSidebarOpen(false);
                            setSelectedNode(null);
                        }} 
                    />
            </div>
        </ReactFlowProvider>
      
        </div>
    );
};

export default FlowComponent;