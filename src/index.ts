/**
 * @description - @coco-platform/init-cli generated template
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

export function sum(...variables: number[]) {
  const numbers = Array.from(variables);

  return numbers.reduce((acc, curr) => acc + curr, 0);
}
