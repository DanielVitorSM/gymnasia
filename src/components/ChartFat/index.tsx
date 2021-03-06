import React from 'react'
import { Text, View } from 'react-native';
import { Svg, SvgProps, Defs, Path, ClipPath, G, Rect } from 'react-native-svg';
import { differenceInYears } from 'date-fns';

import { styles } from './style';
import { typography } from '../../global/styles/typography';

type BodyProps = {
    sex: string;
    percent: number;
}

type ChartProps = {
    height: number;
    weight: number;
    sex: string;
    birth_date: Date;
    hip?: number;
    neck?: number;
    waist?: number;
}

/**
 * Render a Chart of Fat, an humanoid showing in yellow the fat percent
 */

export function ChartFat({ height, weight, birth_date, sex, hip=0, neck=0, waist=0 }: ChartProps) {
    const age = differenceInYears(new Date(), birth_date);
    var percent: number = 0;

    if((sex === "M" && neck > 0 && waist > 0 && waist > neck) || (sex === "F" && neck > 0 && waist > 0 && hip > 0 && (waist + hip > neck)))
        percent = CalcFatHard(height, waist, neck, sex, hip);
    else
        percent = CalcFatMiddle(height, weight, age, sex);
    
    if(percent < 5)
        percent = CalcFatMiddle(height, weight, age, sex);

    return (
        <View style={styles.container}>
            <View style={styles.chart}>
                <BodyChart sex={sex} percent={percent * 100}/>
            </View>
            <View>
                <Text style={typography.small300}>Percentual de Gordura:</Text>
                <Text style={typography.value700}>{(percent * 100).toFixed(2)}%</Text>
                <Text style={[typography.small300, { marginTop: 5 }]}>Massa Gorda:</Text>
                <Text style={typography.value700}>{(weight * percent).toFixed(2)} kg</Text>
                <Text style={[typography.small300, { marginTop: 5 }]}>Massa Magra:</Text>
                <Text style={typography.value700}>{(weight * (1 - percent)).toFixed(2)} kg</Text>
            </View>
        </View>
    )
}

/**
 * Calculate Body Mass Index using height and weight
 * @param height Height in centimeter
 * @param weight Weight in kilogram
 * @returns Return the BMI in kilogram per square meter
 */

export function CalcIMC(height: number, weight: number): number {
    return weight / Math.pow(height / 100, 2);
}

/**
 * Calculate Fat percent with little information 
 * @param height Height in centimeter
 * @param weight Weight in kilogram
 * @param age Age in years
 * @param sex "F" or "M"
 * @returns Far percent in decimal
 */

function CalcFatMiddle(height:number, weight: number, age: number, sex: string): number{
    const imc: number = CalcIMC(height, weight);
    const s: number = (sex === "F") ? 0 : 1;

    return ((1.20 * imc) + (0.23 * age) - (10.8 * s) - 5.4) / 100;
}

/**
 * Calculate Fat percent with more information
 * @param height Height in centimeter
 * @param neck Neck in centimeter
 * @param hip Hip in centimeter
 * @param waist Waits in centimeter
 * @param sex "F" or "M"
 * @returns Far percent in decimal
 */

function CalcFatHard(height: number, waist: number, neck: number, sex: string, hip: number | undefined): number{
    if(sex == "M")
        return (495 / ( 1.033 - 0.191 * Math.log10(waist - neck) + 0.155 * Math.log10(height)) - 450) / 100;
    if(hip)
        return (495 / ( 1.296 - 0.350 * Math.log10(hip + waist - neck) + 0.221 * Math.log10(height)) - 450) / 100;
    return 0;
}

/**
 * Render the illustration chart of body fat
 * @param sex "F" or "M"
 * @percent Fat percent
 */

function BodyChart({ sex, percent }: BodyProps){
    return (
        <Svg 
            width={80}
            height={150}
            viewBox="-2 -1 8 27.5"
        >
            <Defs>
                <ClipPath id="male">
                    <MaleBody />
                </ClipPath>
                <ClipPath id="female">
                    <FemaleBody />
                </ClipPath>
            </Defs>
            {
                sex === "F" &&
                <FemaleBody fill="#ff7f2a"/>
            }
            {
                sex === "M" &&
                <MaleBody fill="#ff7f2a"/>
            }
            <Rect
                x="0"
                y="0"
                width="100%"
                height={`${100 - percent}%`}
                fill="yellow"
                clipPath={`url(#${sex == "F" ? "female" : "male"})`}
            />
        </Svg>
    )
}

/**
 * Male Chart Illustration
 */

function MaleBody(props: SvgProps) {
  return (
    <G  scale="1">
        <Path
            d="M3.766.001C4.2.02 4.781.175 4.87.671c.086.37-.042.78.129 1.124-.007.194.066.471-.102.61-.153.07-.078.296-.178.42-.22.323-.215.738-.134 1.106.102.31.477.376.739.496.16.006.275.145.45.109.269.018.521.128.764.212.039.095.192.084.24.195.556.552.393 1.394.602 2.079.134.921-.099 1.869.114 2.783.04 1.494-.237 2.994-.016 4.482.058.274.052.539-.122.772-.148.364-.443.7-.84.78-.197-.134.048-.39.116-.533-.144-.121.09-.266.167-.357.17-.114.368-.396.167-.564-.257.024-.16.45-.404.492-.105-.298-.081-.647-.094-.965.036-.277.29-.502.196-.8-.168-.848-.474-1.689-.376-2.567.01-.448.074-.91-.1-1.335-.17-.57-.03-1.213-.31-1.748-.107.099-.034.337-.072.48-.066.692-.358 1.377-.172 2.076.215 1.319.466 2.64.523 3.98.037 1.61-.239 3.223-.073 4.83.14.964.227 1.968.013 2.927a6.324 6.324 0 00-.506 2.012c-.016.337-.1.697.038 1.015-.027.51.362.943.339 1.449-.153.218-.494.115-.72.176-.197-.02-.52.168-.636-.073-.179-.514.048-1.063-.045-1.588a.83.83 0 01.12-.671c.088-.667.041-1.352.022-2.022-.138-.653-.245-1.332-.093-1.995.076-.266.136-.539.075-.818-.155-.434-.34-.865-.364-1.334-.13-.806-.076-1.636-.232-2.434-.16-.434-.222-.896-.283-1.353-.044-.14-.173-.01-.146.093-.032.691-.367 1.326-.36 2.023-.07.994-.08 2.02-.48 2.952-.182.327.08.67.062 1.02.054.612.04 1.23-.082 1.832a20.71 20.71 0 00-.046 1.864c.105.305.29.625.162.952-.073.526.118 1.085-.078 1.59-.39-.013-.818-.017-1.204-.123-.174-.173-.011-.463.022-.665.136-.35.194-.72.278-1.082.109-.416-.054-.859-.086-1.279-.065-.62-.352-1.18-.506-1.774a9.047 9.047 0 010-2.275c.205-.98.13-1.993.069-2.984a25.215 25.215 0 01-.01-3.269c.14-1.028.303-2.056.482-3.077a3.817 3.817 0 00-.126-1.49c-.07-.31-.02-.657-.12-.952-.181.207-.141.536-.198.794-.049.65-.258 1.276-.236 1.932-.033.782 0 1.579-.243 2.333-.064.328-.206.697-.076 1.023.216.32.094.739.119 1.1.026.103-.058.322-.164.162-.115-.136-.098-.453-.349-.414-.164.32.215.561.431.73.146.102-.136.141-.017.254.15.102.226.3.06.43-.246.018-.467-.207-.613-.389-.223-.308-.423-.673-.336-1.067.104-2.455-.06-4.921.087-7.377.208-.679.05-1.542.641-2.066.338-.298.796-.388 1.231-.415.294-.155.666-.216.896-.465.19-.408.102-.891-.115-1.275-.018-.202-.172-.334-.237-.513-.054-.204-.092-.444.033-.624.061-.463-.076-1.047.348-1.38.146-.165.375-.134.548-.231.103-.019.209-.018.313-.016z"
            {...props}
        />
    </G>
  )
}

/**
 * Female Chart Illustration
 */

function FemaleBody(props: SvgProps) {
    return (
        <G  scale="1">
            <Path
                d="M3.41.006c-.448-.06-.774.36-.809.771a1.05 1.05 0 01-.232.565c.047.193.065.398.12.59.173.211.149.499.31.72.245.326.286.815.084 1.169-.37.38-.96.355-1.41.594a1.02 1.02 0 00-.697.859c-.2 1.347-.148 2.725-.45 4.058-.159 1.455-.014 2.936-.309 4.374-.05.312-.002.724.289.901.206-.019.495.175.639-.046-.017-.12.083-.234-.023-.341-.345-.328-.223-.835-.268-1.257-.072-.855.403-1.629.47-2.472.083-.795.024-1.605.286-2.374.123-.37.129-.784.294-1.136.1.045.072.255.145.347.268.566.386 1.254.247 1.86-.475 1.285-1.056 2.633-.83 4.034.1 1.115.371 2.21.493 3.318-.023 1.108-.216 2.213-.14 3.325.104 1.583.743 3.111.592 4.71.002.503-.276.965-.259 1.465.102.265.452.291.681.395.175.075.377-.034.365-.236.066-.69-.015-1.393.106-2.073-.072-.328-.323-.605-.256-.958-.028-1.162.23-2.303.183-3.467-.043-.868-.144-1.747.092-2.598.245-.981.257-2.03.432-3.002.175 1.103.229 2.227.498 3.316.147.619.085 1.253.054 1.883-.033 1.047.038 2.094.148 3.132.033.551.014 1.115-.216 1.623-.015.705.037 1.417.08 2.123-.03.168.105.332.28.263.259-.092.656-.107.753-.411 0-.601-.322-1.164-.29-1.77-.024-1.857.806-3.635.638-5.508-.04-1.023-.295-2.061-.031-3.074.232-1.49.64-3.037.215-4.533-.16-.725-.492-1.395-.708-2.099-.084-.62.066-1.255.326-1.82.026-.07.046-.296.152-.254.14.949.521 1.866.478 2.84-.01.895.3 1.742.5 2.602.039.505.034 1.027-.055 1.525-.131.192-.335.467-.154.692.168.15.403-.137.555.025.262-.176.382-.531.314-.84-.083-.802-.254-1.596-.22-2.408-.002-.976-.036-1.958-.231-2.915-.172-1.095-.107-2.218-.335-3.304-.093-.524-.592-.81-1.069-.926-.403-.136-1.016-.185-1.127-.692-.065-.355.063-.73.255-1.037.108-.333.305-.64.328-.998.092-.137.028-.271-.086-.361-.142-.378-.134-.918-.56-1.117-.206-.06-.425-.051-.637-.052z"
                {...props}
            />
        </G>
    )
  }