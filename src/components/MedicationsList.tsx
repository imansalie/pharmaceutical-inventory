import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const MedicationsList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    stock_quantity: 0,
    minimum_stock: 0,
    unit_price: 0,
    manufacturer: "",
  });
  
  const { data: medications, isLoading: medicationsLoading } = useQuery({
    queryKey: ['medications'],
    queryFn: async () => {
      console.log('Fetching medications...');
      const { data, error } = await supabase
        .from('medications')
        .select(`
          *,
          categories (
            name
          )
        `)
        .order('name');
        
      if (error) {
        console.error('Error fetching medications:', error);
        throw error;
      }
      console.log('Medications fetched:', data);
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMedication) {
        const { error } = await supabase
          .from('medications')
          .update(formData)
          .eq('id', editingMedication.id);
        
        if (error) throw error;
        toast({ title: "Medication updated successfully" });
      } else {
        const { error } = await supabase
          .from('medications')
          .insert([formData]);
        
        if (error) throw error;
        toast({ title: "Medication created successfully" });
      }
      
      queryClient.invalidateQueries({ queryKey: ['medications'] });
      setIsDialogOpen(false);
      setFormData({
        name: "",
        category_id: "",
        stock_quantity: 0,
        minimum_stock: 0,
        unit_price: 0,
        manufacturer: "",
      });
      setEditingMedication(null);
    } catch (error) {
      console.error('Error saving medication:', error);
      toast({ 
        title: "Error saving medication", 
        variant: "destructive" 
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('medications')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['medications'] });
      toast({ title: "Medication deleted successfully" });
    } catch (error) {
      console.error('Error deleting medication:', error);
      toast({ 
        title: "Error deleting medication", 
        variant: "destructive" 
      });
    }
  };

  const handleEdit = (medication: any) => {
    setEditingMedication(medication);
    setFormData({
      name: medication.name,
      category_id: medication.category_id,
      stock_quantity: medication.stock_quantity,
      minimum_stock: medication.minimum_stock,
      unit_price: medication.unit_price,
      manufacturer: medication.manufacturer,
    });
    setIsDialogOpen(true);
  };

  if (medicationsLoading) {
    return <div>Loading medications...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Medications</h2>
        <Button onClick={() => {
          setEditingMedication(null);
          setFormData({
            name: "",
            category_id: "",
            stock_quantity: 0,
            minimum_stock: 0,
            unit_price: 0,
            manufacturer: "",
          });
          setIsDialogOpen(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingMedication ? "Edit Medication" : "Add New Medication"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="stock_quantity">Stock Quantity</label>
                <Input
                  id="stock_quantity"
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="minimum_stock">Minimum Stock</label>
                <Input
                  id="minimum_stock"
                  type="number"
                  value={formData.minimum_stock}
                  onChange={(e) => setFormData({ ...formData, minimum_stock: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="unit_price">Unit Price ($)</label>
              <Input
                id="unit_price"
                type="number"
                step="0.01"
                value={formData.unit_price}
                onChange={(e) => setFormData({ ...formData, unit_price: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="manufacturer">Manufacturer</label>
              <Input
                id="manufacturer"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                {editingMedication ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Min. Stock</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medications?.map((medication) => (
            <TableRow key={medication.id}>
              <TableCell className="font-medium">{medication.name}</TableCell>
              <TableCell>{medication.categories?.name}</TableCell>
              <TableCell>{medication.stock_quantity}</TableCell>
              <TableCell>{medication.minimum_stock}</TableCell>
              <TableCell>${medication.unit_price}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(medication)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(medication.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};