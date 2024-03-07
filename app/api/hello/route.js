import { NextResponse } from 'next/server';

export async function GET(request) {
  return new NextResponse(JSON.stringify({ message: "Hello Reactflow" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
