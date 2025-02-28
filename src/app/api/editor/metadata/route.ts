import { NextResponse } from 'next/server';
import yaml from 'js-yaml';

export async function GET(request) {
  const url = new URL(request.url);
  const contracts = JSON.parse(url.searchParams.get('contracts') || '[]');

  if (!contracts.length) {
    return NextResponse.json({ message: 'No contracts provided' }, { status: 400 });
  }

  const randomData = {
    contract_id: Math.floor(Math.random() * 1000),
    contract_name: `Contract ${Math.floor(Math.random() * 10)}`,
    details: `Details of contract ${Math.floor(Math.random() * 10)}`,
  };

  const yamlData = yaml.dump(randomData);

  return NextResponse.json({ yaml: yamlData });
}
