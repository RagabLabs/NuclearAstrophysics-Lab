import {finite,PhysicsError} from './validation';
/** First-order propagation with a supplied covariance matrix; no implicit independence. */
export function propagateCovariance(gradient:number[],covariance:number[][]) {
  const n=gradient.length;if(covariance.length!==n||covariance.some(r=>r.length!==n))throw new PhysicsError('COVARIANCE','Covariance dimensions must match the gradient.');
  for(let i=0;i<n;i++){finite(gradient[i],'Gradient');for(let j=0;j<n;j++){finite(covariance[i][j],'Covariance');if(Math.abs(covariance[i][j]-covariance[j][i])>1e-12*Math.max(1,Math.abs(covariance[i][j])))throw new PhysicsError('COVARIANCE','Covariance must be symmetric.');}}
  // LDL^T positive-semidefinite check, including zero pivots.
  const L=Array.from({length:n},()=>Array(n).fill(0)),D=Array(n).fill(0),scale=Math.max(...covariance.flat().map(Math.abs),Number.MIN_VALUE),tol=scale*1e-12;
  for(let i=0;i<n;i++){for(let j=0;j<i;j++){let v=covariance[i][j];for(let k=0;k<j;k++)v-=L[i][k]*L[j][k]*D[k];if(Math.abs(D[j])<=tol){if(Math.abs(v)>tol)throw new PhysicsError('COVARIANCE','Covariance is not positive semidefinite.');}else L[i][j]=v/D[j];}let v=covariance[i][i];for(let k=0;k<i;k++)v-=L[i][k]**2*D[k];if(v < -tol)throw new PhysicsError('COVARIANCE','Covariance is not positive semidefinite.');D[i]=Math.max(0,v);L[i][i]=1;}
  let v=0;for(let i=0;i<n;i++)for(let j=0;j<n;j++)v+=gradient[i]*covariance[i][j]*gradient[j];return Math.sqrt(Math.max(0,v));
}
export const uncertaintyPolicy = 'Numerical error, nuclear-data uncertainty, temperature, density, and model approximation are separate. No combined uncertainty is available without covariance information. Unknown is not zero.';
