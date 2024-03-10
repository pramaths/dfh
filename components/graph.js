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
  },
  {
    id: 'communitySupport',
    type: 'output',
    data: { label: 'Community Support' },
    position: { x: 550, y: 400 },
    draggable: true,
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
    const [careerPath, setCareerPath] = useState([]);
    const [careerRaw,setCareerRaw]=useState([])
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
console.log('linkedin',selections.linkedIn)

    const callRelevantApi = useCallback(async () => {
        let endpoint = '/api/careeradvisor'; 
        let body = {
            interests: selections.interests,
            notInterests: selections.notinterests,
            growth: selections.growth,
            workEnv: selections.workenv,
            hobby: selections.hobby,
        };

        if (selections.linkedIn) {
            endpoint = '/api/linkedin';
            body = { profileUrl: selections.linkedIn }; // Assuming the LinkedIn API expects a profile link
        } else if (selections.resume) {
            endpoint = '/api/resume';
            body = { pdfUrl: selections.resume }; // Assuming the Resume API expects resume content
        }
        console.log(`Calling API: ${endpoint} with body:`, body);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            console.log('hello',response)
            const data = await response.json();
            setCareerRaw(data)
            setCareerPath(data.careerPaths)
            console.log(data);
        } catch (error) {
            console.error('Failed to call API:', error);
        }
    }, [selections]);
console.log('raw',careerRaw)
    useEffect(() => {
        callRelevantApi();
    }, [callRelevantApi]);
    // const onNodeClick = (event, node) => {
    //     console.log("Node clicked:", node);
    //     setSidebardetails('Software Engineering is a systematic engineering approach to software development.A Software Engineer applies engineering principles to design, develop, maintain, test, and evaluate computer software.This field is vast and offers numerous opportunities for specialization.')
    //     setSelectedNode(node);
    //     setIsSidebarOpen(true); // Open your sidebar upon clicking a node
    //     setSidebarContent(node.data.label); // Set the sidebar content based on the clicked node

        
    // };
    const onNodeClick = async (event, node) => {
        console.log("Node clicked:", node);
        setSelectedNode(node);
        const endpoint = '/api/resource';
        const body = {
            label: node.data.label,
        };
    
        try {
            setIsSidebarOpen(true); // Optionally, open the sidebar immediately or wait for successful fetch
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
    
            if (!response.ok) throw new Error('Network response was not ok');
    
            const data = await response.json();
            console.log("API response data:", data);
            setSidebarContent(node.data.label); // This could be updated based on response if needed
            setSidebardetails(data.details); // Assume 'details' is the field in your response with the info
    
        } catch (error) {
            console.error('Failed to fetch node details:', error);
            // Handle error (show an error message, etc.)
        }
    };
    console.log(sidebarContent)
    console.log(sidebardetials)
    console.log('hello this your data',careerPath)
    console.log(careerPath.length)
    // console.log(careerPath[0])
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
  
    // const addCareerPathNodeAndEdge = useCallback(() => {
    //     if (nodes.length >= careerPaths.length + 1) { // Plus one to account for the 'You' node
    //         return;
    //     }

    //     const newNodeId = `node_${nodes.length}`;
    //     const angle = ((Math.PI * 3) / careerPaths.length) * (nodes.length - 1);
    //     const x = Math.cos(angle) * nodeDistance * (nodes.length - 1);
    //     const y = Math.sin(angle) * nodeDistance * (nodes.length - 1);

    //     const newNode = {
    //         id: newNodeId,
    //         data: { label: careerPaths[nodes.length - 1].title +careerPaths[nodes.length-1].emoji },
    //         type:'output',
    //         position: { x: (nodes.length * nodeDistance) % window.innerWidth, y: Math.floor((nodes.length * nodeDistance) / window.innerWidth) * nodeDistance },
    //         draggable: true,
    //     };
    //     const newEdge = { id: `e1-${newNodeId}`, source: '1', target: newNodeId ,animated:true};

    //     setNodes((nds) => nds.concat(newNode));
    //     setEdges((eds) => eds.concat(newEdge));

    //     // if (reactFlowInstance) {
    //     //     reactFlowInstance.fitView();
    //     // }
    // }, [nodes, reactFlowInstance]);
    
    const addCareerPathNodeAndEdge = useCallback(() => {
        const existingNodeIds = nodes.map((node) => node.id);
        const nextNodeId = existingNodeIds.length + 1;
        const newNodeId = `node_${nextNodeId}`;
        
        // Check if the title already exists in the current nodes to prevent duplicates
        if (careerPath.length > 0 && !existingNodeIds.includes(newNodeId)) {
            const career = careerPath[nextNodeId - 2]; // Adjust index for array
            const angle = ((Math.PI * 2) / careerPath.length) * (nextNodeId - 2);
            const x = Math.cos(angle) * nodeDistance;
            const y = Math.sin(angle) * nodeDistance;
    
            const newNode = {
                id: newNodeId,
                type: 'output', // Make sure this custom node type is implemented correctly
                data: { label: `${career?.title} ${career.emoji}` },
                position: { x: x + window.innerWidth / 2, y: y + window.innerHeight / 2 }, // Adjust position to be relative to center
                draggable: true,
            };
    
            const newEdge = {
                id: `e-${newNodeId}`,
                source: '1', // Source is the 'You' node
                target: newNodeId,
                type: 'floating', // Ensure 'floating' edge type is defined if needed
                animated: true,
                // ... any other edge properties
            };
    
            setNodes((nds) => [...nds, newNode]);
            setEdges((eds) => [...eds, newEdge]);
        }
    }, [careerPath, nodes, setNodes, setEdges]);

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