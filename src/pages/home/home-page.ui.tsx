import * as Plot from "@observablehq/plot"
import * as d3 from "d3"
import useMeasure from "react-use-measure"
import { data } from "./home-page.data";
import { findMinMaxDates } from "./home-page.utils";
import { eachDayOfInterval, eachMonthOfInterval, endOfMonth, formatDate, startOfMonth } from "date-fns";

export function HomePage() {
    const [ref, bounds] = useMeasure();
    return (
        <>
            <div>HomePage</div>
            <div ref={ref} className="flex px-4 h-96 bg-stone-900/70 rounded-md backdrop-blur-md ring-1 ring-stone-400 mx-4">
                <BarChart items={data} width={bounds.width} height={bounds.height} />
            </div>
        </>
    )
}
export interface Items {
    [id: string]: Link
}
interface Link {
    times: { start: Date, end: Date }[]
}
interface BarChartProps {
    items: Items,
    width: number,
    height: number
}
function BarChart({ items, width, height }: BarChartProps) {
    let margin = {
        top: 50,
        right: 10,
        bottom: 50,
        left: 50,
    }
    const [minDate, maxDate] = findMinMaxDates(items)
    const xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear()
        .domain([0, Object.keys(items).length])
        .range([margin.bottom, height - margin.top])

    const days = eachDayOfInterval({ start: minDate, end: maxDate })
    return <>
        <svg viewBox={`0 0 ${width} ${height}`} className="text-white">

            {days.map((day) => (
                <g transform={`translate(${xScale(day)}, 0)`}>
                    <text y={10} fill="currentColor" textAnchor="middle" className="text-[10px]">{formatDate(day, "MM-dd")}</text>
                    <line y1={margin.top - 10} y2={height - margin.bottom} stroke="currentColor" strokeDasharray={'1, 6'} />
                </g>
            ))}
            {
                Object.entries(items).map(([id, value], index) => (
                    <g key={index} transform={`translate(0, ${yScale(index)})`}>

                        <line x1={margin.left} x2={width - margin.right}
                            stroke="currentColor" />
                        <text fill="currentColor" alignmentBaseline="middle">{id}</text>
                        {value.times.map((timeRange, idx) => {
                            console.log(xScale(timeRange.start), xScale(timeRange.end))
                            return <line key={idx} x1={xScale(timeRange.start)} x2={xScale(timeRange.end) + 5} strokeWidth={20} stroke="red" strokeOpacity={0.5} />
                        })}
                    </g>

                ))
            }
        </svg >
    </>
}