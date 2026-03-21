export function formatDate(dateString: string): string {
    if (!dateString) return '';
    
    const cleanDate = dateString.split('T')[0]; 
    const partes = cleanDate.split('-');
    
    if (partes.length !== 3) return dateString; 
    
    const [year, month, day] = partes;
    return `${day}/${month}/${year}`;
}

export function calculateDays(start: string, end: string): number {
    if (!start || !end) return 0;
    
    const d1 = new Date(start);
    const d2 = new Date(end);
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;
    
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays + 1;
}