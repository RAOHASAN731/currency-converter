import { NextResponse } from 'next/server'

const BASE_URL = "https://api.exchangerate-api.com/v4/latest"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const base = searchParams.get('base') || 'USD'
  
  try {
    const response = await fetch(`${BASE_URL}/${base}`)
    const data = await response.json()
    
    return NextResponse.json({
      base: data.base,
      rates: data.rates,
      date: data.date
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch exchange rates' },
      { status: 500 }
    )
  }
}
